//package vn.hcmute.elearning.handler.teacher;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import vn.hcmute.elearning.client.PaygateClient;
//import request.paygate.client.vn.fpt.elearning.FundTransferRequest;
//import request.paygate.client.vn.fpt.elearning.GetBeneficiaryRequest;
//import response.paygate.client.vn.fpt.elearning.FundTransferResponse;
//import response.paygate.client.vn.fpt.elearning.GetBalanceResponse;
//import core.vn.fpt.elearning.RequestHandler;
//import request.teacher.dtos.vn.fpt.elearning.WithDrawRequest;
//import response.teacher.dtos.vn.fpt.elearning.WithdrawResponse;
//import entity.vn.fpt.elearning.Bank;
//import entity.vn.fpt.elearning.Teacher;
//import entity.vn.fpt.elearning.User;
//import entity.vn.fpt.elearning.WithdrawInvoice;
//import vn.hcmute.elearning.enums.*;
//import exception.vn.fpt.elearning.InternalException;
//import email.model.vn.fpt.elearning.EmailModel;
//import vn.hcmute.elearning.service.interfaces.*;
//import utils.vn.fpt.elearning.CommonUtils;
//
//import java.math.BigDecimal;
//import java.text.DecimalFormat;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.HashMap;
//import java.util.Map;
//
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class WithdrawHandler extends RequestHandler<WithDrawRequest, WithdrawResponse> {
//    private final ITeacherService teacherService;
//    private final PaygateClient paygateClient;
//    private final IWithdrawInvoiceService withdrawInvoiceService;
//    private final IBankService bankService;
//    private final IEmailService emailService;
//    private final IUserService userService;
//    @Value("${paygate.account-no}")
//    private String accountNo;
//
//    @Override
//    public WithdrawResponse handle(WithDrawRequest request) {
//        User user = userService.getUserByIdNotNull(request.getUserId());
//        Teacher teacher = teacherService.getByUserId(user.getId());
//        if (teacher == null) {
//            throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
//        }
//        if (!teacher.checkLinkedAccount()) {
//            throw new InternalException(ResponseCode.BANK_ACCOUNT_NOT_FOUNT);
//        }
//        if (request.getAmount().compareTo(new BigDecimal(teacher.getBalance())) > 0) {
//            throw new InternalException(ResponseCode.BALANCE_INSUFFICIENT);
//        }
//        String code = StringUtils.upperCase(CommonUtils.getRandomString(16, false));
//        Bank bank = bankService.getByNapasCode(teacher.getBin());
//        paygateClient.getBeneficiary(new GetBeneficiaryRequest(teacher.getAccountNo(), teacher.getBin(), FTTarget.ACCOUNT_NO));
//        GetBalanceResponse balance = paygateClient.getBalance();
//        if (request.getAmount().compareTo(balance.getBalance()) > 0) {
//            throw new InternalException(ResponseCode.WITHDRAW_NOT_ALLOW_NOW);
//        }
//        FundTransferRequest ftRequest = new FundTransferRequest();
//        ftRequest.setBin(teacher.getBin())
//            .setReferenceNumber(code)
//            .setMethod(FTMethod.NAPAS_247)
//            .setAccountNo(accountNo)
//            .setAmount(request.getAmount())
//            .setTarget(FTTarget.ACCOUNT_NO)
//            .setBin(teacher.getBin())
//            .setDescription("RUT TIEN E LEARNING")
//            .setToAccountNo(teacher.getAccountNo());
//        FundTransferResponse fundTransferResponse = paygateClient.fundTransfer(ftRequest);
//        WithdrawInvoice invoice = new WithdrawInvoice()
//            .setReferenceNumber(code)
//            .setStatus(fundTransferResponse.getStatus())
//            .setTxnNumber(fundTransferResponse.getTxnNumber())
//            .setAccountNo(accountNo)
//            .setToAccountNo(teacher.getAccountNo())
//            .setToAccountName(teacher.getAccountName())
//            .setToBin(teacher.getBin())
//            .setBank(bank)
//            .setAmount(request.getAmount())
//            .setTime(LocalDateTime.now())
//            .setTeacher(teacher);
//        invoice = withdrawInvoiceService.save(invoice);
//        teacher.setBalance(teacher.getBalance() - request.getAmount().longValue());
//        teacherService.save(teacher);
//        String showStatus;
//        if (FTStatus.PENDING.equals(invoice.getStatus())) {
//            showStatus = "<span id=\"status-pending\">Chờ</span>";
//        } else if (FTStatus.SUCCESS.equals(invoice.getStatus())) {
//            showStatus = "<span id=\"status-success\">Thành công</span>";
//        } else {
//            showStatus = "<span id=\"status-failed\">Thất bại</span>";
//        }
//        DecimalFormat df = new DecimalFormat("###,###,###");
//        Map<String, Object> params = new HashMap<>();
//        params.put("customerName", teacher.getEkyc().getName());
//        params.put("status", showStatus);
//        params.put("refTransaction", invoice.getReferenceNumber());
//        params.put("txnNumber", invoice.getTxnNumber());
//        params.put("accountName", invoice.getToAccountName());
//        params.put("accountNo", invoice.getToAccountNo());
//        params.put("bankName", bank.getName());
//        params.put("amount", df.format(invoice.getAmount()));
//        params.put("time", DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm").format(invoice.getTime()));
//        EmailModel model = EmailModel.builder()
//            .to(new String[]{user.getEmail()})
//            .isHtml(true)
//            .templateName(MailTemplateEnum.NOTIFY_WITHDRAW.name())
//            .subject(MailTemplateEnum.NOTIFY_WITHDRAW.getSubject())
//            .parameterMap(params)
//            .build();
//        emailService.sendEmail(model);
//        return new WithdrawResponse(invoice, null);
//    }
//}