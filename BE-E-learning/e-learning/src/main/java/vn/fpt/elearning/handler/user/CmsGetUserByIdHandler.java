package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.user.request.CmsGetInfoByIdRequest;
import vn.fpt.elearning.dtos.user.response.GetInfoResponse;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IUserMapper;
import vn.fpt.elearning.model.user.UserDto;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class CmsGetUserByIdHandler extends RequestHandler<CmsGetInfoByIdRequest, GetInfoResponse> {
    private final IUserService userService;
    private final IUserMapper userMapper;

    @Override
    public GetInfoResponse handle(CmsGetInfoByIdRequest request) {
        User user = userService.getUserById(request.getId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        UserDto userDto = userMapper.toUserDto(user);
        return new GetInfoResponse(userDto);
    }
}
