package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.TokenVerifier;
import org.keycloak.representations.RefreshToken;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.LogoutRequest;
import vn.fpt.elearning.dtos.auth.response.LogoutResponse;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.RedisService;

@Component
@RequiredArgsConstructor
@Slf4j
public class LogoutHandler extends RequestHandler<LogoutRequest, LogoutResponse> {
    private final KeycloakService keycloakService;
    private final RedisService redisService;

    @Override
    public LogoutResponse handle(LogoutRequest request) {
        try {
            RefreshToken refreshToken = TokenVerifier.create(request.getRefreshToken(), RefreshToken.class).getToken();
            if (keycloakService.invalidateToken(request.getRefreshToken())) {
                redisService.deleteKey(refreshToken.getSessionState());
                return new LogoutResponse();
            }
        } catch (Exception e) {
            log.error("logout error: {}", e.getLocalizedMessage());
        }
        throw new InternalException(ResponseCode.REFRESH_TOKEN_INVALID);
    }
}
