package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.auth.response.AccessTokenResponseCustom;
import vn.fpt.elearning.dtos.user.request.ChangePasswordRequest;
import vn.fpt.elearning.dtos.user.response.ChangePasswordResponse;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class ChangePasswordHandler extends RequestHandler<ChangePasswordRequest, ChangePasswordResponse> {
    private final IUserService userService;
    private final KeycloakService keycloakService;

    @Override
    public ChangePasswordResponse handle(ChangePasswordRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        if (!request.getPasswordNew().equals(request.getPasswordConfirm())) {
            throw new InternalException(ResponseCode.PASSWORD_NOT_MATCH);
        }
        AccessTokenResponseCustom tokenResponseCustom = keycloakService.getUserJWT(user.getEmail(), request.getPasswordCurrent());
        if (tokenResponseCustom == null) {
            throw new InternalException(ResponseCode.PASSWORD_INCORRECT);
        }
        boolean isSuccess = keycloakService.setUserPassword(user.getId(), request.getPasswordNew());
        if (!isSuccess) {
            return new ChangePasswordResponse("Đổi mật khẩu thất bại", false);
        }
        return new ChangePasswordResponse("Đổi mật khẩu thành công", true);
    }
}
