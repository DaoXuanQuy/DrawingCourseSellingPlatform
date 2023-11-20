package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.user.request.CmsUnbanUserRequest;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class CmsUnbanUserHandler extends RequestHandler<CmsUnbanUserRequest, StatusResponse> {
    private final IUserService userService;

    @Override
    public StatusResponse handle(CmsUnbanUserRequest request) {
        User user = userService.getUserById(request.getId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        user.setBan(false);
        userService.updateUser(user);
        return new StatusResponse();
    }
}
