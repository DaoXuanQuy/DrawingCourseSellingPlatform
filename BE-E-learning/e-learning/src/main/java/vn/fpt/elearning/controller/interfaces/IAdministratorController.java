package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.admin.request.*;
import vn.fpt.elearning.dtos.admin.response.CreateAdminResponse;
import vn.fpt.elearning.dtos.admin.response.GetInfoAdminResponse;
import vn.fpt.elearning.dtos.admin.response.UpdateInfoAdminResponse;
import vn.fpt.elearning.model.admin.AdministratorDto;


import javax.validation.Valid;

@RequestMapping("/api/admin")
@SecurityRequirement(name = "bearerAuth")
public interface IAdministratorController {
    @PostMapping("/v1/create")
    ResponseEntity<ResponseBase<CreateAdminResponse>> createAdmin(@Valid @RequestBody CreateAdminRequest request);

    @PutMapping("/v1/ban")
    ResponseEntity<ResponseBase<StatusResponse>> banAdmin(@Valid @RequestBody BanAdminRequest request);

    @PutMapping("/v1/unban")
    ResponseEntity<ResponseBase<StatusResponse>> unbanAdmin(@Valid @RequestBody UnbanAdminRequest request);

    @PostMapping("/v1/resetPassword")
    ResponseEntity<ResponseBase<StatusResponse>> resetPasswordAdmin(@Valid @RequestBody ResetPasswordAdminRequest request);

    @PutMapping("/v1/updateInfo")
    ResponseEntity<ResponseBase<UpdateInfoAdminResponse>> updateInfoAdmin(@Valid @RequestBody UpdateInfoAdminRequest request);

    @GetMapping("/v1/getInfo/{id}")
    ResponseEntity<ResponseBase<GetInfoAdminResponse>> getInfoAdminById(@PathVariable String id);

    @GetMapping("/v1/getInfo")
    ResponseEntity<ResponseBase<GetInfoAdminResponse>> getInfoAdmin();

    @GetMapping("/v1/getList")
    ResponseEntity<ResponseBase<PageResponseData<AdministratorDto>>> getListAdministrator(@ParameterObject GetListAdminRequest request,
                                                                                          @ParameterObject Pageable pageable);
}
