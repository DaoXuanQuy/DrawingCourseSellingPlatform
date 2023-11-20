package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.auth.request.*;
import vn.fpt.elearning.dtos.auth.response.*;


import javax.validation.Valid;

@Tag(name = "Auth Controller", description = "Thao tác với auth")
@RequestMapping(value = "/api/auth")
public interface IAuthController {

    @Operation(
        summary = "login",
        description = "- login với username là email hoặc số điện thoại",
        responses = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
        })
    @PostMapping(value = "/v1/login")
    ResponseEntity<ResponseBase<AccessTokenResponseCustom>> login(@Valid @RequestBody LoginRequest request);

    @PostMapping("/v1/register")
    ResponseEntity<ResponseBase<RegisterResponse>> register(@RequestBody RegisterRequest request);

    @PostMapping("/v1/re-active")
    ResponseEntity<ResponseBase<ReActiveResponse>> reActive(@RequestBody ReActiveRequest request);

    @GetMapping("/v1/verify/re-active")
    ResponseEntity<ResponseBase<VerifyReActiveResponse>> verifyReActive(@ParameterObject VerifyReActiveRequest request);

    @PostMapping("/v1/token/refresh")
    ResponseEntity<ResponseBase<AccessTokenResponseCustom>> refreshToken(@RequestBody RefreshTokenRequest request);

    @GetMapping("/v1/verify/email")
    ResponseEntity<ResponseBase<VerifyEmailResponse>> verifyEmail(@ParameterObject VerifyEmailRequest request);

    @PutMapping("/v1/password/forgot")
    ResponseEntity<ResponseBase<ForgotPasswordResponse>> forgotPassword(@RequestBody ForgotPasswordRequest request);

    @PutMapping("/v1/password/reset")
    ResponseEntity<ResponseBase<ResetPasswordResponse>> resetPassword(@RequestParam("email") String email,
                                                                      @RequestParam("token") String token,
                                                                      @RequestBody ResetPasswordRequest request);

    @PostMapping("/v1/logout")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<LogoutResponse>> logout(@RequestBody LogoutRequest request);

    @PostMapping("/v1/cms/login")
    ResponseEntity<ResponseBase<AccessTokenResponseCustom>> loginCms(@RequestBody @Valid LoginCmsRequest request);
}
