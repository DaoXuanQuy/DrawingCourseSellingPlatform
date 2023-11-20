package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.course.request.RejectedCourseRequest;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
@Slf4j
public class RejectedCourseHandler extends RequestHandler<RejectedCourseRequest, StatusResponse> {
    private final ICourseService iCourseService;

    @Override
    public StatusResponse handle(RejectedCourseRequest request) {
        Course course = iCourseService.getCourseById(request.getId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        course.setApproveStatus(ApproveStatus.REJECTED);

        iCourseService.save(course);
        return new StatusResponse();
    }
}
