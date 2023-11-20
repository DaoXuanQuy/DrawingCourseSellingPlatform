package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.RegisterCourseRequest;
import vn.fpt.elearning.dtos.course.response.RegisterCourseResponse;
import vn.fpt.elearning.service.course.CourseRegisterStrategy;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
@Slf4j
public class RegisterCourseHandler extends RequestHandler<RegisterCourseRequest, RegisterCourseResponse> {

    private final ICourseService courseService;

    public RegisterCourseHandler(ICourseService courseService) {
        this.courseService = courseService;
    }

    @Override
    public RegisterCourseResponse handle(RegisterCourseRequest request) {
        CourseRegisterStrategy strategy = courseService.getRegisterStrategy(request.getPaymentType());
        return new RegisterCourseResponse(strategy.create(request.getCourseId(), request.getUserId()));
    }
}
