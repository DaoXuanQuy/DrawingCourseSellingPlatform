package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.BlockCourseRequest;
import vn.fpt.elearning.dtos.course.response.BlockCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
public class BlockCourseHandler extends RequestHandler<BlockCourseRequest, BlockCourseResponse> {

    private final ICourseService courseService;
    private final ICourseMapper courseMapper;

    public BlockCourseHandler(ICourseService courseService, ICourseMapper courseMapper) {
        this.courseService = courseService;
        this.courseMapper = courseMapper;
    }

    @Override
    public BlockCourseResponse handle(BlockCourseRequest request) {
        Course course = courseService.getCourseById(request.getId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        course.setApproveStatus(ApproveStatus.BLOCK);

        Course courseSave = courseService.save(course);
        CourseDto courseDto = courseMapper.toCourseDto(courseSave);
        return new BlockCourseResponse(courseDto);
    }
}
