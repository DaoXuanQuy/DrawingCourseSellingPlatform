package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.teacher.request.*;
import vn.fpt.elearning.dtos.teacher.response.CreateRequestRoleTeacherResponse;
import vn.fpt.elearning.dtos.teacher.response.GetInfoTeacherResponse;
import vn.fpt.elearning.dtos.teacher.response.TeacherGetBalanceResponse;
import vn.fpt.elearning.dtos.teacher.response.WithdrawResponse;
import vn.fpt.elearning.model.teacher.TeacherDto;
import vn.fpt.elearning.dtos.teacher.request.WithDrawRequest;


import javax.validation.Valid;

@RequestMapping("/api/teacher")
public interface ITeacherController {
    @PostMapping("/portal/v1/createRequestRoleTeacher")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<CreateRequestRoleTeacherResponse>> createRequestRoleTeacher(@RequestBody CreateRequestRoleTeacherRequest request);

    @PostMapping("/cms/v1/approveRequestRoleTeacher")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> approveRequestRoleTeacher(@RequestBody ApproveRequestRoleTeacherRequest request);

    @PostMapping("/cms/v1/getDetail")
    ResponseEntity<ResponseBase<GetInfoTeacherResponse>> getDetail(@RequestBody GetDetailTeacherByIdRequest request);

    @PutMapping("/cms/v1/rejectRequestRoleTeacher")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> rejectRequestRoleTeacher(@RequestBody RejectRequestRoleTeacherRequest request);

    @GetMapping("/cms/v1/listRequestRoleTeacher")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<PageResponseData<TeacherDto>>> getListRequestRoleTeacher(@ParameterObject GetListTeacherRequest request,
                                                                                         @ParameterObject Pageable pageable);

    @GetMapping("/teacher/v1/getInfo")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetInfoTeacherResponse>> getInfo();

    @GetMapping("/protal/v1/getInfo")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetInfoTeacherResponse>> getTeacherInfo();

    @Operation(
        summary = "Rút tiền",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/teacher/v1/withdraw")
    ResponseEntity<ResponseBase<WithdrawResponse>> withDraw(@RequestBody @Valid WithDrawRequest request);

    @Operation(
        summary = "Lấy số dư",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/teacher/v1/get-balance")
    ResponseEntity<ResponseBase<TeacherGetBalanceResponse>> getBalance();
}
