package vn.fpt.elearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.auth.request.*;
import vn.fpt.elearning.dtos.auth.response.*;
import vn.fpt.elearning.controller.interfaces.IAuthController;

@RestController
public class AuthController extends BaseController implements IAuthController {

    @Override
    public ResponseEntity<ResponseBase<AccessTokenResponseCustom>> login(LoginRequest request) {
        return this.execute(request, AccessTokenResponseCustom.class);
    }

    @Override
    public ResponseEntity<ResponseBase<RegisterResponse>> register(RegisterRequest request) {
        return this.execute(request, RegisterResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<ReActiveResponse>> reActive(ReActiveRequest request) {
        return this.execute(request, ReActiveResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<VerifyReActiveResponse>> verifyReActive(VerifyReActiveRequest request) {
        return this.execute(request, VerifyReActiveResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<AccessTokenResponseCustom>> refreshToken(RefreshTokenRequest request) {
        return this.execute(request, AccessTokenResponseCustom.class);
    }

    @Override
    public ResponseEntity<ResponseBase<VerifyEmailResponse>> verifyEmail(VerifyEmailRequest request) {
        return this.execute(request, VerifyEmailResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<ForgotPasswordResponse>> forgotPassword(ForgotPasswordRequest request) {
        return this.execute(request, ForgotPasswordResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<ResetPasswordResponse>> resetPassword(String email, String token, ResetPasswordRequest request) {
        request.setEmail(email);
        request.setToken(token);
        return this.execute(request, ResetPasswordResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<LogoutResponse>> logout(LogoutRequest request) {
        return this.execute(request, LogoutResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<AccessTokenResponseCustom>> loginCms(LoginCmsRequest request) {
        return this.execute(request, AccessTokenResponseCustom.class);
    }

}
