package vn.fpt.elearning.handler.answer;

import com.uber.cadence.client.WorkflowClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.answer.request.StartDoExamRequest;
import vn.fpt.elearning.dtos.answer.response.StartDoExamResponse;
import vn.fpt.elearning.entity.*;
import vn.fpt.elearning.enums.*;
import vn.fpt.elearning.utils.CommonUtils;

import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.IUserService;
import vn.fpt.elearning.workflow.factory.StartDoExamWorkflowFactory;
import vn.fpt.elearning.workflow.workflow.interfaces.IStartDoExamWorkflow;

import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class StartDoExamHandler extends RequestHandler<StartDoExamRequest, StartDoExamResponse> {
    private final IExamResultService examResultService;
    private final IExamService examService;
    private final IUserService userService;
    private final StartDoExamWorkflowFactory startDoExamWorkflowFactory;
    @Override
    public StartDoExamResponse handle(StartDoExamRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null || Boolean.TRUE.equals(user.getBan())) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Exam exam = examService.getExamById(request.getExamId());
        if (exam == null || ExamStatus.INACTIVE.equals(exam.getStatus())) {
            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
        }
        ExamResult examResult = examResultService.getByUserAndExamAndStatus(user.getId(), exam.getId(), ExamResultStatus.CREATE);
        if (examResult != null) {
            return new StartDoExamResponse(examResult.getCode());
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
        if (testAttempts >= exam.getTestAttempts()) {
            throw new InternalException(ResponseCode.OUT_OF_ATTEMPTS);
        }
        examResult = new ExamResult()
            .setStatus(ExamResultStatus.CREATE)
            .setExam(exam)
            .setUser(user)
            .setCode(CommonUtils.getRandomString(16,false));
        examResultService.save(examResult);
        try {
            IStartDoExamWorkflow iStartDoExamWorkflow = startDoExamWorkflowFactory.newWorkflow();
            WorkflowClient.start(iStartDoExamWorkflow::startDoExamWorkflow, examResult.getCode(), exam.getTimeMinute(), startDoExamWorkflowFactory.getActivitiesOptionsMap());
        } catch (Exception e) {
            log.error("Push workflow error: {}", e.getMessage());
        }
        return new StartDoExamResponse(examResult.getCode());
    }
}
