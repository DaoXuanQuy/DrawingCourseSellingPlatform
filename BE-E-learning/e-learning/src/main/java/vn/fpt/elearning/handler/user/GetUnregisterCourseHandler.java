package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.user.request.GetUnregisterCourseRequest;
import vn.fpt.elearning.dtos.user.response.GetUnregisterCourseResponse;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetUnregisterCourseHandler extends RequestHandler<GetUnregisterCourseRequest, GetUnregisterCourseResponse> {

    private final ICourseService courseService;
    private final IUserService userService;

    @Override
    public GetUnregisterCourseResponse handle(GetUnregisterCourseRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Page<CourseDto> page = courseService.getUnregisterCourseByUser(user, request.getPageable());
        return new GetUnregisterCourseResponse(page.getContent(), new Paginate(page));
    }

}
