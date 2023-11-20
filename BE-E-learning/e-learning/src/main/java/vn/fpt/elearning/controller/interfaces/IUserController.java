package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.user.request.*;
import vn.fpt.elearning.dtos.user.response.*;
import vn.fpt.elearning.model.UserResponse;

import java.security.Principal;

@RequestMapping(value = "/api/user")
@Tag(name = "User controller", description = "User controller")
public interface IUserController {
    @GetMapping("cms/v1/getAll")
    @Operation(
        summary = "[CMS]Lấy danh sách người dùng",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<CmsGetAllUserResponse>> getALl(@ParameterObject CmsGetAllUserRequest request, @ParameterObject Pageable pageable);

    @PutMapping("cms/v1/ban/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<CmsBanUserResponse>> banUser(@PathVariable(name = "id") String id);

    @PutMapping("cms/v1/unban/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> unbanUser(@PathVariable(name = "id") String id);

    @DeleteMapping("cms/v1/{id}")
    @Operation(
        deprecated = true,
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> deleteUser(@PathVariable("id") String id);

    @DeleteMapping("cms/v2/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> deleteUserV2(@PathVariable("id") String id);

    @GetMapping("cms/v1/info/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetInfoResponse>> getInfoById(@PathVariable(name = "id") String id);

    @PutMapping("cms/v1/update/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UpdateInfoResponse>> updateInfoById(@PathVariable(name = "id") String id, @RequestBody CmsUpdateInfoByIdRequest request);

    @PutMapping("/v1/password/change")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<ChangePasswordResponse>> changePassword(Principal principal,
                                                                        @RequestBody ChangePasswordRequest request);

    @GetMapping("/portal/v1/info")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UserResponse>> getInfo(Principal principal);

    @GetMapping("/cms/v1/users")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetUsersResponse>> getUsers(@ParameterObject GetUsersRequest request, @ParameterObject Pageable page);

    @PutMapping("/v1/update")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UserResponse>> updateInfo(Principal principal, @RequestBody UpdateInfoRequest request);

    @GetMapping("/portal/v1/ekyc-info")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetEkycInfoResponse>> getEkycInfo();

}
