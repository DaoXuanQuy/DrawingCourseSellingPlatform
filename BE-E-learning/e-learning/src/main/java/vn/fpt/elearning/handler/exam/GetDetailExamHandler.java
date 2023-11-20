package vn.fpt.elearning.handler.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam.request.GetDetailExamRequest;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.entity.*;
import vn.fpt.elearning.enums.*;

import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.IUserService;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class GetDetailExamHandler extends RequestHandler<GetDetailExamRequest, ExamResponse> {

    private final IExamService examService;
    private final IUserService userService;
    private final IExamResultService examResultService;

    @Override
    public ExamResponse handle(GetDetailExamRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null || Boolean.TRUE.equals(user.getBan())) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Exam exam = examService.getExamById(request.getId());
        if (exam == null || ExamStatus.INACTIVE.equals(exam.getStatus())) {
            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
        }
        Lesson lesson = exam.getLesson();
        if (lesson == null || DisplayStatus.HIDE.equals(lesson.getDisplayStatus())) {
            throw new InternalException(ResponseCode.LESSON_NOT_FOUND);
        }
        Course course = lesson.getCourse();
        if (course == null || CourseStatus.INACTIVE.equals(course.getStatus()) || !ApproveStatus.APPROVE.equals(course.getApproveStatus())) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        Set<User> courseUsers = course.getUsers();
        if (courseUsers == null || !courseUsers.contains(user)) {
            throw new InternalException(ResponseCode.USER_INVALID);
        }
        int testAttempts = examResultService.getTestAttempts(user.getId(), exam.getId(), false);
        ExamResult examResult = examResultService.getByStudentAndExam(user.getId(), exam.getId());
        Double maxExamScore = examService.getMaxExamScore(exam.getId());
        return new ExamResponse(exam).setTotalAttemptsCompleted(testAttempts).setHighestScore(examResult == null ? null : examResult.getScore()).setExamMaxScore(maxExamScore);
    }
}
