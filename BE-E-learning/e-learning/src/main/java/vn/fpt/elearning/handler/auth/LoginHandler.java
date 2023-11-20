package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.LoginRequest;
import vn.fpt.elearning.dtos.auth.response.AccessTokenResponseCustom;
import vn.fpt.elearning.service.interfaces.IAuthService;

@Component
@RequiredArgsConstructor
public class LoginHandler extends RequestHandler<LoginRequest, AccessTokenResponseCustom> {
    private final IAuthService authService;

    @SneakyThrows
    @Override
    public AccessTokenResponseCustom handle(LoginRequest request) {
        return authService.login(request);
    }
}
