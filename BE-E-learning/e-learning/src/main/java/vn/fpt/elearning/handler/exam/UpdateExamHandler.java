package vn.fpt.elearning.handler.exam;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam.request.UpdateExamRequest;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class UpdateExamHandler extends RequestHandler<UpdateExamRequest, ExamResponse> {

    private final IExamService examService;
    private final ICourseService courseService;
    private final IUserService userService;


    @Override
    public ExamResponse handle(UpdateExamRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Course course = courseService.getCourseByExamId(request.getId());
        if (!user.getId().equals(course.getCreatedBy())) {
            throw new InternalException(ResponseCode.COURSE_INVALID);
        }
        Exam exam = examService.getExamById(request.getId());
        if (exam == null) {
            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
        }
        if (StringUtils.isNotBlank(request.getExamName())) {
            exam.setExamName(request.getExamName());
        }
        if (request.getExamType() != null) {
            exam.setExamType(request.getExamType());
        }
        if (request.getTimeMinute() != null) {
            exam.setTimeMinute(request.getTimeMinute());
        }
        if (request.getStatus() != null) {
            exam.setStatus(request.getStatus());
        }
        if (request.getTestAttempts() != null) {
            exam.setTestAttempts(request.getTestAttempts());
        }
        exam = examService.save(exam);
        return new ExamResponse(exam);
    }
}
