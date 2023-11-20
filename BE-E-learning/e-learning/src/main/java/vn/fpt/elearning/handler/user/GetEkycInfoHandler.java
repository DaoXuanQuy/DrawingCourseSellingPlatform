package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.user.request.GetEkycInfoRequest;
import vn.fpt.elearning.dtos.user.response.GetEkycInfoResponse;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IEkycMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IEkycService;
import vn.fpt.elearning.service.interfaces.ITeacherService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetEkycInfoHandler extends RequestHandler<GetEkycInfoRequest, GetEkycInfoResponse> {
    private final IUserService iUserService;
    private final IEkycService iEkycService;
    private final ITeacherService iTeacherService;
    private final IEkycMapper iEkycMapper;

    @Override
    public GetEkycInfoResponse handle(GetEkycInfoRequest request) {
        User user = iUserService.getUserById(request.getUserId());
        if (Boolean.FALSE.equals(user.getIsOrc())) {
            throw new InternalException(ResponseCode.USER_NOT_AUTHENTICATED_OCR);
        }
        return new GetEkycInfoResponse(iEkycMapper.toEkycDTO(user.getTeacher().getEkyc()));
    }
}
