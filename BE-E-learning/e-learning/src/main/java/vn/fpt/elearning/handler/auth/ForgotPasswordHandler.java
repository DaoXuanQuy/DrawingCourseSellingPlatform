package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.ForgotPasswordRequest;
import vn.fpt.elearning.dtos.auth.response.ForgotPasswordResponse;
import vn.fpt.elearning.service.interfaces.IAuthService;

@Component
@RequiredArgsConstructor
public class ForgotPasswordHandler extends RequestHandler<ForgotPasswordRequest, ForgotPasswordResponse> {
    private final IAuthService authService;

    @Override
    public ForgotPasswordResponse handle(ForgotPasswordRequest request) {
        return authService.forgotPassword(request);
    }
}
