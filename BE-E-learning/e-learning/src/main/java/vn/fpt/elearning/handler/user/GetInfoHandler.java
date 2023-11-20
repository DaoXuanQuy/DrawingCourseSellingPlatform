package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.user.request.GetInfoRequest;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IUserMapper;
import vn.fpt.elearning.model.UserResponse;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class GetInfoHandler extends RequestHandler<GetInfoRequest, UserResponse> {
    private final IUserService userService;
    private final IUserMapper userMapper;
    @Override
    public UserResponse handle(GetInfoRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        return new UserResponse(user);
    }
}
