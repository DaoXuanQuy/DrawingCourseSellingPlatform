package vn.fpt.elearning.handler.answer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.answer.request.GetSubmitAnswerByExamResultRequest;
import vn.fpt.elearning.dtos.answer.response.AnswerResponse;
import vn.fpt.elearning.dtos.answer.response.GetSubmitAnswerByExamResultResponse;
import vn.fpt.elearning.dtos.question.response.QuestionResponse;
import vn.fpt.elearning.entity.*;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.utils.Paginate;

import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.repository.ExamResultRepository;
import vn.fpt.elearning.service.interfaces.IAnswerService;
import vn.fpt.elearning.service.interfaces.IFillCorrectService;
import vn.fpt.elearning.service.interfaces.IOptionService;
import vn.fpt.elearning.service.interfaces.IQuestionService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GetSubmitAnswerByExamResultHandler extends RequestHandler<GetSubmitAnswerByExamResultRequest, GetSubmitAnswerByExamResultResponse> {

    private final ExamResultRepository examResultRepository;
    private final IQuestionService questionService;
    private final IAnswerService answerService;
    private final IOptionService optionService;
    private final IFillCorrectService fillCorrectService;

    @Override
    public GetSubmitAnswerByExamResultResponse handle(GetSubmitAnswerByExamResultRequest request) {
        ExamResult examResult = examResultRepository.findById(request.getExamResultId())
            .orElseThrow(() -> new InternalException(ResponseCode.EXAM_RESULT_NOT_FOUND));
        Page<Question> page = questionService.getPageQuestionByExam(examResult.getExam(), request.getPageable());
        List<Question> questions = page.getContent();
        Map<String, QuestionResponse> questionMap = questions.stream()
            .map(question -> {
                List<Option> options = optionService.getOptionsByQuestion(question.getId());
                List<FillCorrect> fillCorrects = new ArrayList<>(fillCorrectService.getByQuestion(question.getId()));
                return new QuestionResponse(question, options, fillCorrects);
            })
            .collect(Collectors.toMap(QuestionResponse::getId, Function.identity()));
        List<Answer> answers = answerService.getByCode(examResult.getCode());
        Map<String, AnswerResponse> answerMap = answers.stream()
            .map(AnswerResponse::new)
            .collect(Collectors.toMap(AnswerResponse::getQuestionId, Function.identity()));
        List<GetSubmitAnswerByExamResultResponse.SubmitAnswer> response = new ArrayList<>();
        for (Question question : questions) {
            response.add(new GetSubmitAnswerByExamResultResponse.SubmitAnswer(questionMap.get(question.getId()), answerMap.get(question.getId())));
        }
        return new GetSubmitAnswerByExamResultResponse(response, new Paginate(page.getNumber(), page.getSize(), (int)page.getTotalElements() ,page.getTotalPages()));
    }
}
