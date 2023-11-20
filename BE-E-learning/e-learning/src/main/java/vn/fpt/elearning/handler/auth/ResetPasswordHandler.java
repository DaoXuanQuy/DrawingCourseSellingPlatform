package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.ResetPasswordRequest;
import vn.fpt.elearning.dtos.auth.response.ResetPasswordResponse;
import vn.fpt.elearning.service.interfaces.IAuthService;

@Component
@RequiredArgsConstructor
public class ResetPasswordHandler extends RequestHandler<ResetPasswordRequest, ResetPasswordResponse> {
    private final IAuthService authService;

    @Override
    public ResetPasswordResponse handle(ResetPasswordRequest request) {
        return authService.resetPassword(request);
    }
}
