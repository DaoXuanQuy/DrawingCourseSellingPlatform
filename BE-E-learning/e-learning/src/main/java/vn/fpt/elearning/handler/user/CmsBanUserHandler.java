package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.user.request.CmsBanUserRequest;
import vn.fpt.elearning.dtos.user.response.CmsBanUserResponse;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class CmsBanUserHandler extends RequestHandler<CmsBanUserRequest, CmsBanUserResponse> {
    private final IUserService userService;
    private final KeycloakService keycloakService;

    @Override
    public CmsBanUserResponse handle(CmsBanUserRequest request) {
        User user = userService.getUserById(request.getId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        user.setBan(true);
        userService.updateUser(user);
//        keycloakService.revokeAllSessionUser(user.getId());
        return new CmsBanUserResponse("Ban thành công", true);
    }
}
