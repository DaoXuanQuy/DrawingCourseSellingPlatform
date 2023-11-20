package vn.fpt.elearning.handler.teacher;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.teacher.request.ApproveRequestRoleTeacherRequest;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.enums.MailTemplateEnum;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.enums.Role;
import vn.fpt.elearning.enums.TeacherStatus;
import vn.fpt.elearning.model.email.EmailModel;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.interfaces.IEkycService;
import vn.fpt.elearning.service.interfaces.IEmailService;
import vn.fpt.elearning.service.interfaces.ITeacherService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApproveRequestRoleTeacherHandler extends RequestHandler<ApproveRequestRoleTeacherRequest, StatusResponse> {
    private final ITeacherService teacherService;
    private final KeycloakService keycloakService;
    private final IEmailService iEmailService;
    private final IEkycService iEkycService;

    @Value("${url.portal}")
    private String portalUrl;

    @Override
    @Transactional
    public StatusResponse handle(ApproveRequestRoleTeacherRequest request) {
        Teacher teacher = teacherService.getById(request.getTeacherId());
        if (teacher == null) {
            throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
        }
        if (iEkycService.getByIdCard(teacher.getEkyc().getNo()).size() > 1) {
            throw new InternalException(ResponseCode.ID_CARD_EXISTED);
        }
        // todo add push notify to mail user
        Map<String, Object> params = new HashMap<>();
        params.put("customerName", String.format("%s %s", teacher.getUser().getFirstName(), teacher.getUser().getLastName()));
        params.put("portalURL", portalUrl);
        EmailModel model = EmailModel.builder()
                .to(new String[]{teacher.getUser().getEmail()})
                .isHtml(true)
                .templateName(MailTemplateEnum.APPROVE_TEACHER.name())
                .subject(MailTemplateEnum.APPROVE_TEACHER.getSubject())
                .parameterMap(params)
                .build();
        iEmailService.sendEmail(model);

        keycloakService.addRoleResource(teacher.getUser().getId(), Role.TEACHER.name());

        teacher.setStatus(TeacherStatus.ACTIVE);
        teacher.setApproveDate(LocalDateTime.now());
        teacherService.save(teacher);

        return new StatusResponse();
    }
}
