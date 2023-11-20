package vn.fpt.elearning.handler.question;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.question.request.DeleteQuestionByIdRequest;
import vn.fpt.elearning.dtos.question.response.DeleteQuestionResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.Question;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IQuestionService;

@Component
@RequiredArgsConstructor
public class DeleteQuestionByIdHandler extends RequestHandler<DeleteQuestionByIdRequest, DeleteQuestionResponse> {
    private final IQuestionService questionService;
    private final IExamResultService examResultService;
    @Override
    public DeleteQuestionResponse handle(DeleteQuestionByIdRequest request) {
        Question question = questionService.getQuestionById(request.getId());
        if (question == null ) {
            throw new InternalException(ResponseCode.QUESTION_NOT_FOUND);
        }
        Exam exam = question.getExam();
        if (examResultService.getTestAttempts(null, exam.getId(), true) > 0) {
            throw new InternalException(ResponseCode.HAVE_ATTEMPTS);
        }
        questionService.deleteQuestionById(request.getId());
        return new DeleteQuestionResponse(true);
    }
}
