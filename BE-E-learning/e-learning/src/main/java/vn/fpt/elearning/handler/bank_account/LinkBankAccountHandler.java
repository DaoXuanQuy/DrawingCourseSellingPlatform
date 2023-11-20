//package vn.hcmute.elearning.handler.bank_account;
//
//import lombok.RequiredArgsConstructor;
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.stereotype.Component;
//import vn.hcmute.elearning.client.MiddlewareClient;
//import response.client.vn.fpt.elearning.CheckBeneficiaryCoreResponse;
//import core.vn.fpt.elearning.RequestHandler;
//import dtos.vn.fpt.elearning.StatusResponse;
//import request.bank_account.dtos.vn.fpt.elearning.LinkBankAccountRequest;
//import entity.vn.fpt.elearning.Bank;
//import entity.vn.fpt.elearning.Teacher;
//import enums.vn.fpt.elearning.ResponseCode;
//import exception.vn.fpt.elearning.InternalException;
//import interfaces.service.vn.fpt.elearning.IBankService;
//import interfaces.service.vn.fpt.elearning.ITeacherService;
//
//@Component
//@RequiredArgsConstructor
//public class LinkBankAccountHandler extends RequestHandler<LinkBankAccountRequest, StatusResponse> {
//    private final MiddlewareClient middlewareClient;
//    private final ITeacherService teacherService;
//    private final IBankService bankService;
//    @Override
//    public StatusResponse handle(LinkBankAccountRequest request) {
//        Teacher teacher = teacherService.getByUserId(request.getUserId());
//        if (teacher == null) {
//            throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
//        }
//        CheckBeneficiaryCoreResponse response = middlewareClient.checkBankAccount(request.getBin(), request.getAccountNo());
//        if (response == null) {
//            throw new InternalException(ResponseCode.GET_BENEFICIARY_FAILED);
//        }
//        if (!StringUtils.equals(request.getAccountName(), response.getAccountName())) {
//            throw new InternalException(ResponseCode.ACCOUNT_NAME_INCORRECT);
//        }
//        Bank bank = bankService.getByNapasCode(request.getBin());
//        teacher.setAccountName(request.getAccountName());
//        teacher.setAccountNo(request.getAccountNo());
//        teacher.setBin(request.getBin());
//        teacherService.save(teacher);
//        return new StatusResponse(true);
//    }
//}
