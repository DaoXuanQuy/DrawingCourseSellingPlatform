package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.VerifyEmailRequest;
import vn.fpt.elearning.dtos.auth.response.VerifyEmailResponse;
import vn.fpt.elearning.service.interfaces.IAuthService;

@Component
@RequiredArgsConstructor
public class VerifyEmailHandler extends RequestHandler<VerifyEmailRequest, VerifyEmailResponse> {
    private final IAuthService authService;

    @Override
    public VerifyEmailResponse handle(VerifyEmailRequest request) {
        return authService.verifyEmail(request);
    }
}
