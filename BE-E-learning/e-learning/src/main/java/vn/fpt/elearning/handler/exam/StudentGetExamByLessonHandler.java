package vn.fpt.elearning.handler.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam.request.StudentGetExamByLessonRequest;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.dtos.exam.response.GetExamByLessonResponse;
import vn.fpt.elearning.entity.*;
import vn.fpt.elearning.enums.*;
import vn.fpt.elearning.service.interfaces.*;
import vn.fpt.elearning.utils.Paginate;

import vn.fpt.elearning.exception.InternalException;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class StudentGetExamByLessonHandler extends RequestHandler<StudentGetExamByLessonRequest, GetExamByLessonResponse> {
    private final ILessonService lessonService;
    private final IExamService examService;
    private final IUserService userService;
    private final IExamResultService examResultService;
    private final IProgressService progressService;
    @Override
    public GetExamByLessonResponse handle(StudentGetExamByLessonRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null || Boolean.TRUE.equals(user.getBan())) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Lesson lesson = lessonService.getById(request.getLessonId());
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
        Page<Exam> exams = examService.getExamByLessonIdAndStatus(lesson.getId(), ExamStatus.ACTIVE, request.getPageable());
        List<ExamResponse> examResponses = exams.getContent().parallelStream().map(exam -> {
            int testAttempts = examResultService.getTestAttempts(user.getId(), exam.getId(), false);
            ExamResult examResult = examResultService.getByStudentAndExam(user.getId(), exam.getId());
            Double maxExamScore = examService.getMaxExamScore(exam.getId());
            boolean isDone = progressService.existsExamProgress(exam.getId(), user.getId());
            return new ExamResponse(exam)
                .setTotalAttemptsCompleted(testAttempts)
                .setHighestScore(examResult == null ? null : examResult.getScore())
                .setExamMaxScore(maxExamScore)
                .setDone(isDone);
        }).collect(Collectors.toList()) ;
        return new GetExamByLessonResponse(examResponses, new Paginate(exams));
    }
}
