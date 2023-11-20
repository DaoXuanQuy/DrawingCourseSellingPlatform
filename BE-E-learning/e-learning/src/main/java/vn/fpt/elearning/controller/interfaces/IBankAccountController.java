package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.bank_account.request.CheckBankAccountRequest;
import vn.fpt.elearning.dtos.bank_account.request.GetAllBanksRequest;
import vn.fpt.elearning.dtos.bank_account.request.LinkBankAccountRequest;
import vn.fpt.elearning.dtos.bank_account.response.CheckBankAccountResponse;
import vn.fpt.elearning.dtos.bank_account.response.GetAllBanksResponse;
import vn.fpt.elearning.dtos.bank_account.response.LinkedAccountResponse;

import javax.validation.Valid;

@Tag(name = "Bank Account Controller")
@RequestMapping(value = "/api/bank-account")
public interface IBankAccountController {
    @Operation(
        summary = "Lấy tất cả danh sách ngân hàng",
        description = "- Lấy tất cả danh sách ngân hàng",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping(value = "/v1/getBanks")
    ResponseEntity<ResponseBase<GetAllBanksResponse>> getAllBanks(@ParameterObject GetAllBanksRequest request, @ParameterObject Pageable pageable);

    @Operation(
        summary = "Kiểm tra tài khoản",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping(value = "/teacher/v1/check-account")
    ResponseEntity<ResponseBase<CheckBankAccountResponse>> checkBankAccount(@ParameterObject CheckBankAccountRequest request);

    @Operation(
        summary = "Link tài khoản",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/teacher/v1/link")
    ResponseEntity<ResponseBase<StatusResponse>> linkBankAccount(@RequestBody @Valid LinkBankAccountRequest request);

    @Operation(
        summary = "Lấy tài khoản liên kết",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/teacher/v1/get")
    ResponseEntity<ResponseBase<LinkedAccountResponse>> getLinkedAccount();

    @Operation(
        summary = "Hủy liên kết",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/teacher/v1/unlink")
    ResponseEntity<ResponseBase<StatusResponse>> unlinkBankAccount();

}
