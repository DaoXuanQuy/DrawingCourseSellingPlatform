package vn.fpt.elearning.handler.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam.request.TeacherGetDetailExamRequest;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class TeacherGetDetailExamHandler extends RequestHandler<TeacherGetDetailExamRequest, ExamResponse> {

    private final IExamService examService;
    private final IUserService userService;
    private final IExamResultService examResultService;
    private final ICourseService courseService;


    @Override
    public ExamResponse handle(TeacherGetDetailExamRequest request) {
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
        int testAttempts = examResultService.getTestAttempts(user.getId(), exam.getId(), true);
        Double maxExamScore = examService.getMaxExamScore(exam.getId());
        return new ExamResponse(exam).setTotalAttemptsCompleted(testAttempts).setExamMaxScore(maxExamScore);
    }
}
