package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.invoice.request.*;
import vn.fpt.elearning.dtos.invoice.response.GetAllInvoiceResponse;
import vn.fpt.elearning.dtos.invoice.response.GetAllWithdrawInvoiceResponse;


import javax.validation.Valid;
import java.util.Map;

@Tag(name = "Invoice Controller")
@RequestMapping("/api/invoice")
public interface IInvoiceController {
//    @Operation(summary = "Thông báo trạng thái hóa đơn")
//    @PostMapping("/public/v1/notifyTransaction")
//    ResponseEntity<ResponseBase<String>> notifyInvoice(
//        @RequestHeader(HeaderBase.CLIENT) String clientId,
//        @RequestHeader(HeaderBase.SIGNATURE) String signature,
//        @RequestHeader(HeaderBase.TIMESTAMP) Long timestamp,
//        @Valid @RequestBody EncryptedBodyRequest request
//    );

    @Operation(
        summary = "Notify VNPay transaction"
    )
    @GetMapping("/public/v1/notify/vnpay")
    ResponseEntity<ResponseBase<StatusResponse>> notifyVNPay(@RequestParam Map<String, String> request);

    @Operation(
        summary = "Lấy danh sách giao dịch của học viên",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/getALl")
    ResponseEntity<ResponseBase<GetAllInvoiceResponse>> getAll(@ParameterObject @Valid GetAllInvoiceRequest request, @ParameterObject Pageable pageable);

    @Operation(
        summary = "Lấy danh sách giao dịch của giảng viên",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/teacher/getALl")
    ResponseEntity<ResponseBase<GetAllInvoiceResponse>> teacherGetAll(@ParameterObject @Valid TeacherGetAllInvoiceRequest request, @ParameterObject Pageable pageable);

    @Operation(
        summary = "[Teacher]Lấy danh lịch sử rút tiền",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/teacher/v1/get-all-withdraw-invoice")
    ResponseEntity<ResponseBase<GetAllWithdrawInvoiceResponse>> teacherGetAllWithdrawInvoice(@ParameterObject TeacherGetAllWithdrawInvoiceRequest request, @PageableDefault(sort = "time", direction = Sort.Direction.DESC) @ParameterObject Pageable pageable);

    @Operation(
        summary = "[CMS]Lấy danh lịch sử rút tiền",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/cms/v1/get-all-withdraw-invoice")
    ResponseEntity<ResponseBase<GetAllWithdrawInvoiceResponse>> cmsGetAllWithdrawInvoice(@ParameterObject CmsGetAllWithdrawInvoiceRequest request, @PageableDefault(sort = "time", direction = Sort.Direction.DESC) @ParameterObject Pageable pageable);


    @Operation(
            summary = "[CMS]Lấy danh giao dịch",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/cms/v1/getAll")
    ResponseEntity<ResponseBase<GetAllInvoiceResponse>> cmsGetAll(@ParameterObject @Valid CmsGetAllInvoiceRequest request, @ParameterObject Pageable pageable);

}
