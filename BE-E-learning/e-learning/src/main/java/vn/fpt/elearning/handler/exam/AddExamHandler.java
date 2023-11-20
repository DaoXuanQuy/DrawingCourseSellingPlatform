package vn.fpt.elearning.handler.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam.request.AddExamRequest;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.Lesson;
import vn.fpt.elearning.enums.ExamStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.ILessonService;

@Component
@RequiredArgsConstructor
public class AddExamHandler extends RequestHandler<AddExamRequest, ExamResponse> {

    private final IExamService examService;
    private final ILessonService lessonService;
    @Override
    public ExamResponse handle(AddExamRequest request) {
        Lesson lesson = lessonService.getById(request.getLessonId());
        if (lesson == null) {
            throw new InternalException(ResponseCode.LESSON_NOT_FOUND);
        }
        Exam exam = new Exam();
        exam.setExamName(request.getExamName());
        exam.setTimeMinute(request.getTimeMinute());
        exam.setExamType(request.getExamType());
        exam.setLesson(lesson);
        exam.setStatus(ExamStatus.ACTIVE);
        if(request.getTestAttempts() != null) {
            exam.setTestAttempts(request.getTestAttempts());
        }
        exam = examService.createExam(exam);
        return new ExamResponse(exam);
    }
}
