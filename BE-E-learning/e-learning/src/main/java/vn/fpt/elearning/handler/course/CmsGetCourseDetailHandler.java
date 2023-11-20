package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.CmsGetCourseDetailRequest;
import vn.fpt.elearning.dtos.course.response.CmsGetDetailCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@Slf4j
@RequiredArgsConstructor
public class CmsGetCourseDetailHandler extends RequestHandler<CmsGetCourseDetailRequest, CmsGetDetailCourseResponse> {
    private final ICourseService iCourseService;

    @Override
    public CmsGetDetailCourseResponse handle(CmsGetCourseDetailRequest request) {
        Course course = iCourseService.getCourseById(request.getId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        return iCourseService.getDetailByTeacher(request.getId());
    }
}
