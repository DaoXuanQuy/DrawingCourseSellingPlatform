package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.ReActiveRequest;
import vn.fpt.elearning.dtos.auth.response.ReActiveResponse;
import vn.fpt.elearning.service.interfaces.IAuthService;

@Component
@RequiredArgsConstructor
public class ReActiveHandler extends RequestHandler<ReActiveRequest, ReActiveResponse> {
    private final IAuthService authService;

    @Override
    public ReActiveResponse handle(ReActiveRequest request) {
        return authService.reActive(request);
    }
}
