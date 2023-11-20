package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.user.request.CmsDeleteUserRequest;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class CmsDeleteUserHandler extends RequestHandler<CmsDeleteUserRequest, StatusResponse> {
    private final IUserService userService;
    private final KeycloakService keycloakService;

    @Override
    public StatusResponse handle(CmsDeleteUserRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        boolean success = keycloakService.deleteUser(user.getId());
        if (!success) {
            return new StatusResponse(false);
        }
        userService.deleteUser(user.getId());
        return new StatusResponse(true);
    }
}
