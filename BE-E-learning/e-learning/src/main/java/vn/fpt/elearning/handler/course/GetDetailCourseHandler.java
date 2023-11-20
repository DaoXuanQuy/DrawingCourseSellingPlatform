package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.GetDetailCourseRequest;
import vn.fpt.elearning.dtos.course.response.GetDetailCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetDetailCourseHandler extends RequestHandler<GetDetailCourseRequest, GetDetailCourseResponse> {

    private final ICourseService courseService;
    private final ICourseMapper courseMapper;

    @Override
    public GetDetailCourseResponse handle(GetDetailCourseRequest request) {
        try {
            Course course = courseService.getCourseById(request.getId());
            if (course == null) {
                throw new InternalException(ResponseCode.COURSE_NOT_FOUND, "Course with Id " + request.getId() + " not found.");
            }
            return new GetDetailCourseResponse(courseMapper.toCourseDto(course));
        } catch (Exception e) {
            log.error("Error while getting course details for id: {}", request.getId(), e);
            throw new InternalException(ResponseCode.INTERNAL_SERVER_ERROR, "Failed to get the course details.", e);
        }
    }
}