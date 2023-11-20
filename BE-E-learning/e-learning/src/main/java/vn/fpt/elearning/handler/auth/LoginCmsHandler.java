package vn.fpt.elearning.handler.auth;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.TokenVerifier;
import org.keycloak.representations.AccessToken;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.request.LoginCmsRequest;
import vn.fpt.elearning.dtos.auth.response.AccessTokenResponseCustom;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.enums.AdminStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.utils.ValidateUtils;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.RedisService;
import vn.fpt.elearning.service.interfaces.IAdministratorService;

@Component
@RequiredArgsConstructor
@Slf4j
public class LoginCmsHandler extends RequestHandler<LoginCmsRequest, AccessTokenResponseCustom> {
    private final KeycloakService keycloakService;
    private final IAdministratorService administratorService;
    private final RedisService redisService;

    @SneakyThrows
    @Override
    public AccessTokenResponseCustom handle(LoginCmsRequest request) {
        AccessTokenResponseCustom token = keycloakService.getUserJWT(request.getPhone(), request.getPassword());
        if (token == null) {
            throw new InternalException(ResponseCode.PASSWORD_INCORRECT);
        }

        AccessToken accessToken = TokenVerifier.create(token.getToken(), AccessToken.class).getToken();
        Administrator administrator = administratorService.getByPhone(request.getPhone());
        if (ValidateUtils.isRootAdmin(accessToken) && administrator == null) {
            administrator = new Administrator()
                .setId(accessToken.getSubject())
                .setEmail(accessToken.getEmail())
                .setPhone(accessToken.getPreferredUsername())
                .setFullName(accessToken.getName())
                .setStatus(AdminStatus.ACTIVE);

            administratorService.save(administrator);
        }
        if (administrator == null) {
            throw new InternalException(ResponseCode.PASSWORD_INCORRECT);
        }
        if (AdminStatus.INACTIVE.equals(administrator.getStatus())) {
            throw new InternalException(ResponseCode.ADMIN_IS_INACTIVE);
        }
        redisService.cacheSessionUser(token.getSessionState(), accessToken.getSubject(), accessToken.getExp() - accessToken.getIat());
        return token;
    }
}
