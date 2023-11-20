package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.RegisterRequest;
import vn.fpt.elearning.dtos.auth.response.RegisterResponse;
import vn.fpt.elearning.service.AuthService;

@Component
@RequiredArgsConstructor
public class RegisterHandler extends RequestHandler<RegisterRequest, RegisterResponse> {
    private final AuthService authService;

    @Override
    public RegisterResponse handle(RegisterRequest request) {
        return authService.register(request);
    }
}
