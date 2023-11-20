package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.CharEncoding;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import vn.fpt.elearning.model.SendMailModel;
import vn.fpt.elearning.model.VariablesThymeleaf;
import vn.fpt.elearning.service.interfaces.IAsyncService;

import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
@Slf4j
@RequiredArgsConstructor
public class AsyncService implements IAsyncService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Override
    @Async
    public void sendMail(SendMailModel mailModel) {
        try {
            Context context = new Context();
            for (VariablesThymeleaf variable : mailModel.getListVariables()) {
                context.setVariable(variable.getName(), variable.getValue());
            }
            String content = templateEngine.process("SendMail", context);
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, CharEncoding.UTF_8);
            helper.setSubject(mailModel.getSubject());
            helper.setFrom(mailModel.getMailFrom());
            helper.setTo(mailModel.getMailTo());
            helper.setText(content, true);
            for (File file : mailModel.getListFileAttach()) {
                helper.addAttachment(file.getName(), file);
            }
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
