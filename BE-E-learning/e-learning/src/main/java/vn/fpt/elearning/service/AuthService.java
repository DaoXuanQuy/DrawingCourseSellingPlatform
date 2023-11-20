package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.TokenVerifier;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.fpt.elearning.dtos.auth.request.*;
import vn.fpt.elearning.dtos.auth.response.*;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.MailTemplateEnum;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.enums.Role;
import vn.fpt.elearning.model.email.EmailModel;

import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IAuthService;
import vn.fpt.elearning.service.interfaces.IEmailService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService implements IAuthService {
    private final KeycloakService keycloakService;
    private final UserService userService;
    private final RedisService redisService;
    private final IEmailService iEmailService;

    @Value("${time.second.expire.token.register}")
    private long expireRegister;

    @Value("${url.verify-email}")
    private String urlVerifyMail;

    @Value("${time.second.expire.token.forgot-password}")
    private long expiredForgotPassword;

    @Value("${url.forgot-password}")
    private String urlForgotPassword;

    @Value("${time.second.expire.token.re-active}")
    private long expiredReActive;

    @Value("${url.re-active}")
    private String urlReActive;

    @Override
    public AccessTokenResponseCustom login(LoginRequest request) throws VerificationException {
        User user = userService.getUserByEmail(request.getUsername());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        if (Boolean.TRUE.equals(user.getBan())) {
            throw new InternalException(ResponseCode.ACCOUNT_IS_BANED);
        }
        if (!user.isActive()) {
            throw new InternalException(ResponseCode.USER_NOT_ACTIVE);
        }
        AccessTokenResponseCustom tokenResponseCustom = keycloakService.getUserJWT(request.getUsername(), request.getPassword());
        if (tokenResponseCustom == null) {
            throw new InternalException(ResponseCode.PASSWORD_INCORRECT);
        }
        AccessToken token = TokenVerifier.create(tokenResponseCustom.getToken(), AccessToken.class).getToken();
        redisService.cacheSessionUser(token.getSessionState(), token.getSubject(), token.getExp() - token.getIat());
        return tokenResponseCustom;
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        User user = userService.getUserByEmail(request.getEmail());
        if (user != null) {
            throw new InternalException(ResponseCode.EMAIL_EXISTED);
        }
        user = userService.getUserByPhone(request.getPhone());
        if (user != null) {
            throw new InternalException(ResponseCode.PHONE_EXISTED);
        }
        String userIdKeycloak = keycloakService.createUser(request.getEmail(), request.getPassword(), request.getEmail(),
                request.getFirstName(), request.getLastName(), Role.STUDENT);
        if (userIdKeycloak == null) {
            throw new InternalException(ResponseCode.USER_CREATE_FAILED);
        }
        user = new User()
                .setEmail(request.getEmail())
                .setPhone(request.getPhone())
                .setFirstName(request.getFirstName())
                .setLastName(request.getLastName())
                .setBirthday(request.getBirthday())
                .setGender(request.getGender())
                .setActive(false)
                .setBan(false)
                .setIsOrc(false)
                .setId(userIdKeycloak);
        if (userService.createUser(user) == null) {
            keycloakService.deleteUser(userIdKeycloak);
            throw new InternalException(ResponseCode.USER_CREATE_FAILED);
        }

        String token = UUID.randomUUID().toString();
        redisService.setValue(request.getEmail(), token);
        redisService.setTimeOut(request.getEmail(), expireRegister);

        String url = urlVerifyMail + "?token=" + token + "&email=" + request.getEmail();
        Map<String, Object> params = new HashMap<>();
        params.put("customerName", String.format("%s %s", user.getFirstName(), user.getLastName()));
        params.put("activeURL", url);
        EmailModel model = EmailModel.builder()
                .to(new String[]{user.getEmail()})
                .isHtml(true)
                .templateName(MailTemplateEnum.CREATE_USER.name())
                .subject(MailTemplateEnum.CREATE_USER.getSubject())
                .parameterMap(params)
                .build();
        iEmailService.sendEmail(model);

        return new RegisterResponse();
    }

    @Override
    public ReActiveResponse reActive(ReActiveRequest request) {
        User user = userService.getUserByEmail(request.getEmail());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        if (user.isActive()) {
            throw new InternalException(ResponseCode.USER_HAS_BEEN_ACTIVE);
        }
        String token = UUID.randomUUID().toString();
        redisService.setValue(request.getEmail(), token);
        redisService.setTimeOut(request.getEmail(), expiredReActive);

        String url = urlReActive + "?token=" + token + "&email=" + request.getEmail();
        Map<String, Object> params = new HashMap<>();
        params.put("customerName", String.format("%s %s", user.getFirstName(), user.getLastName()));
        params.put("activeURL", url);
        EmailModel model = EmailModel.builder()
                .to(new String[]{user.getEmail()})
                .isHtml(true)
                .templateName(MailTemplateEnum.CREATE_USER.name())
                .subject(MailTemplateEnum.CREATE_USER.getSubject())
                .parameterMap(params)
                .build();
        iEmailService.sendEmail(model);
        return new ReActiveResponse("Vui lòng kiểm tra email", true);
    }

    @Override
    public VerifyReActiveResponse verifyReActive(VerifyReActiveRequest request) {
        String token = redisService.getValue(request.getEmail(), String.class);
        User user = userService.getUserByEmail(request.getEmail());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        if (token == null) {
            throw new InternalException(ResponseCode.TOKEN_NOT_EXISTED);
        }
        if (!token.equals(request.getToken())) {
            throw new InternalException(ResponseCode.TOKEN_INCORRECT);
        }
        user.setActive(true);
        user = userService.updateUser(user);
        if (user == null) {
            return new VerifyReActiveResponse(false);
        }
        redisService.deleteKey(request.getEmail());
        return new VerifyReActiveResponse(true);
    }


    @Override
    public AccessTokenResponseCustom refreshToken(RefreshTokenRequest request) {
        AccessTokenResponseCustom accessTokenResponseCustom = keycloakService.refreshToken(request.getRefreshToken());
        log.debug("accessToken {}", accessTokenResponseCustom);
        AccessToken token = null;
        try {
            token = TokenVerifier.create(accessTokenResponseCustom.getToken(), AccessToken.class).getToken();
            redisService.setValue(token.getSessionState(), token.getSubject());
            redisService.setTimeOut(token.getSessionState(), Math.toIntExact(token.getExp()));
        } catch (VerificationException e) {
            log.error("TokenVerifier error: {}", e.getLocalizedMessage());
        }
        return accessTokenResponseCustom;
    }

    @Override
    public VerifyEmailResponse verifyEmail(VerifyEmailRequest request) {
        String token = redisService.getValue(request.getEmail(), String.class);
        User user = userService.getUserByEmail(request.getEmail());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        if (token == null) {
            throw new InternalException(ResponseCode.TOKEN_NOT_EXISTED);
        }
        if (!token.equals(request.getToken())) {
            throw new InternalException(ResponseCode.TOKEN_INCORRECT);
        }
        user.setActive(true);
        user = userService.updateUser(user);
        if (user == null) {
            return new VerifyEmailResponse("Xác thực email thất bại", false);
        }
        redisService.deleteKey(request.getEmail());
        return new VerifyEmailResponse("Xác thực email thành công", true);
    }

    @Override
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        User user = userService.getUserByEmail(request.getEmail());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        String token = UUID.randomUUID().toString();
        redisService.setValue(request.getEmail(), token);
        redisService.setTimeOut(request.getEmail(), expiredForgotPassword);

        String url = urlForgotPassword + "?token=" + token + "&email=" + request.getEmail();
        Map<String, Object> params = new HashMap<>();
        params.put("customerName", String.format("%s %s", user.getFirstName(), user.getLastName()));
        params.put("forgotURL", url);
        EmailModel model = EmailModel.builder()
                .to(new String[]{user.getEmail()})
                .isHtml(true)
                .templateName(MailTemplateEnum.FORGOT_PASSWORD.name())
                .subject(MailTemplateEnum.FORGOT_PASSWORD.getSubject())
                .parameterMap(params)
                .build();
        iEmailService.sendEmail(model);
        return new ForgotPasswordResponse("Vui lòng kiểm tra email", true);
    }

    @Override
    public ResetPasswordResponse resetPassword(ResetPasswordRequest request) {
        String token = redisService.getValue(request.getEmail(), String.class);
        if (token == null) {
            throw new InternalException(ResponseCode.TOKEN_NOT_EXISTED);
        }
        if (!token.equals(request.getToken())) {
            throw new InternalException(ResponseCode.TOKEN_INCORRECT);
        }
        User user = userService.getUserByEmail(request.getEmail());
        boolean isResetPassword = keycloakService.setUserPassword(user.getId().toString(), request.getPassword());
        if (!isResetPassword) {
            return new ResetPasswordResponse("Cập nhật mật khẩu thất bại", false);
        }
        redisService.deleteKey(request.getEmail());
        return new ResetPasswordResponse("Cập nhật mật khẩu thành công", true);
    }
}
