package vn.fpt.elearning.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.bank_account.request.*;
import vn.fpt.elearning.dtos.bank_account.response.CheckBankAccountResponse;
import vn.fpt.elearning.dtos.bank_account.response.GetAllBanksResponse;
import vn.fpt.elearning.dtos.bank_account.response.LinkedAccountResponse;
import vn.fpt.elearning.controller.interfaces.IBankAccountController;


@RestController
public class BankAccountController extends BaseController implements IBankAccountController {
    @Override
    public ResponseEntity<ResponseBase<GetAllBanksResponse>> getAllBanks(GetAllBanksRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request, GetAllBanksResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<CheckBankAccountResponse>> checkBankAccount(CheckBankAccountRequest request) {
        return this.execute(request, CheckBankAccountResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> linkBankAccount(LinkBankAccountRequest request) {
        return this.execute(request, StatusResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<LinkedAccountResponse>> getLinkedAccount() {
        return this.execute(new GetLinkedAccountRequest(), LinkedAccountResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> unlinkBankAccount() {
        return this.execute(new UnlinkBankAccountRequest(), StatusResponse.class);
    }


}
