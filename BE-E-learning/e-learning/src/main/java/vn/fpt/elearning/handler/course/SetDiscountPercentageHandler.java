package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.SetDiscountPercentageRequest;
import vn.fpt.elearning.dtos.course.response.UpdateCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
public class SetDiscountPercentageHandler extends RequestHandler<SetDiscountPercentageRequest, UpdateCourseResponse> {

    private final ICourseService courseService;
    private final ICourseMapper courseMapper;

    @Override
    public UpdateCourseResponse handle(SetDiscountPercentageRequest request) {
        Course course = courseService.getCourseById(request.getCourseId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        course.setDiscountPercentage(request.getDiscountPercentage());
        course = courseService.save(course);
        CourseDto courseDto = courseMapper.toCourseDto(course);
        courseDto.setCurrentPrice(course.getPrice() * (100 - course.getDiscountPercentage()) / 100);
        return new UpdateCourseResponse(courseDto);
    }
}
