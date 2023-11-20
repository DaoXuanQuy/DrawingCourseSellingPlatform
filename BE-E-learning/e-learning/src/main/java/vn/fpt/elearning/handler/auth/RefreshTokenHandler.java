package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.RefreshTokenRequest;
import vn.fpt.elearning.dtos.auth.response.AccessTokenResponseCustom;
import vn.fpt.elearning.service.interfaces.IAuthService;

@Component
@RequiredArgsConstructor
public class RefreshTokenHandler extends RequestHandler<RefreshTokenRequest, AccessTokenResponseCustom> {
    private final IAuthService authService;

    @Override
    public AccessTokenResponseCustom handle(RefreshTokenRequest request) {
        return authService.refreshToken(request);
    }
}
