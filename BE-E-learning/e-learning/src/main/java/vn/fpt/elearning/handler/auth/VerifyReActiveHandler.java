package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.VerifyReActiveRequest;
import vn.fpt.elearning.dtos.auth.response.VerifyReActiveResponse;
import vn.fpt.elearning.service.interfaces.IAuthService;

@Component
@RequiredArgsConstructor
public class VerifyReActiveHandler extends RequestHandler<VerifyReActiveRequest, VerifyReActiveResponse> {
    private final IAuthService authService;

    @Override
    public VerifyReActiveResponse handle(VerifyReActiveRequest request) {
        return authService.verifyReActive(request);
    }
}
