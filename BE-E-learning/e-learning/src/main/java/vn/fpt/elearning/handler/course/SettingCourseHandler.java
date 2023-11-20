package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.SettingCourseRequest;
import vn.fpt.elearning.dtos.course.response.SettingCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
@Slf4j
public class SettingCourseHandler extends RequestHandler<SettingCourseRequest, SettingCourseResponse> {
    private final ICourseService courseService;
    private final ICourseMapper courseMapper;

    @Override
    public SettingCourseResponse handle(SettingCourseRequest request) {
        Course course = courseService.getCourseById(request.getId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        course.setStatus(request.getStatus());

        Course courseSave = courseService.save(course);
        CourseDto courseDto = courseMapper.toCourseDto(courseSave);
        return new SettingCourseResponse(courseDto);
    }
}
