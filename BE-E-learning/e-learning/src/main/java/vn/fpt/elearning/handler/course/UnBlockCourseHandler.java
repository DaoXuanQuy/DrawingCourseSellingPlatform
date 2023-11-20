package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.UnBlockCourseRequest;
import vn.fpt.elearning.dtos.course.response.UnblockCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
@Slf4j
public class UnBlockCourseHandler extends RequestHandler<UnBlockCourseRequest, UnblockCourseResponse> {
    private final ICourseService iCourseService;
    private final ICourseMapper courseMapper;

    @Override
    public UnblockCourseResponse handle(UnBlockCourseRequest request) {
        Course course = iCourseService.getCourseById(request.getId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        course.setApproveStatus(ApproveStatus.WAITING);

        Course courseSave = iCourseService.save(course);
        CourseDto courseDto = courseMapper.toCourseDto(courseSave);
        return new UnblockCourseResponse(courseDto);
    }
}
