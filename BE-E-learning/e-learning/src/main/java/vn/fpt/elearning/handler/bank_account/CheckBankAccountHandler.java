//package vn.hcmute.elearning.handler.bank_account;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import vn.hcmute.elearning.client.MiddlewareClient;
//import response.client.vn.fpt.elearning.CheckBeneficiaryCoreResponse;
//import core.vn.fpt.elearning.RequestHandler;
//import request.bank_account.dtos.vn.fpt.elearning.CheckBankAccountRequest;
//import response.bank_account.dtos.vn.fpt.elearning.CheckBankAccountResponse;
//import enums.vn.fpt.elearning.ResponseCode;
//import exception.vn.fpt.elearning.InternalException;
//import interfaces.service.vn.fpt.elearning.IBankService;
//
//@Component
//@RequiredArgsConstructor
//public class CheckBankAccountHandler extends RequestHandler<CheckBankAccountRequest, CheckBankAccountResponse> {
//    private final MiddlewareClient middlewareClient;
//    private final IBankService bankService;
//    @Override
//    public CheckBankAccountResponse handle(CheckBankAccountRequest request) {
//        bankService.getByNapasCode(request.getBin());
//        CheckBeneficiaryCoreResponse response = middlewareClient.checkBankAccount(request.getBin(), request.getAccountNo());
//        if (response == null) {
//            throw new InternalException(ResponseCode.FAILED);
//        }
//        return new CheckBankAccountResponse(response.getAccountName());
//    }
//}
