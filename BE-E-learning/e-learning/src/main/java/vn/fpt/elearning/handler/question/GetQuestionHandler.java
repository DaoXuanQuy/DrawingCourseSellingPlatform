package vn.fpt.elearning.handler.question;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.question.request.GetQuestionRequest;
import vn.fpt.elearning.dtos.question.response.GetQuestionResponse;
import vn.fpt.elearning.dtos.question.response.QuestionResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.FillCorrect;
import vn.fpt.elearning.entity.Option;
import vn.fpt.elearning.entity.Question;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.IFillCorrectService;
import vn.fpt.elearning.service.interfaces.IOptionService;
import vn.fpt.elearning.service.interfaces.IQuestionService;
import vn.fpt.elearning.service.specifications.QuestionSpecification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GetQuestionHandler extends RequestHandler<GetQuestionRequest, GetQuestionResponse> {
    private final IExamService examService;
    private final IQuestionService questionService;
    private final QuestionSpecification questionSpecification;
    private final IOptionService optionService;
    private final IFillCorrectService fillCorrectService;

    @Override
    public GetQuestionResponse handle(GetQuestionRequest request) {
        Exam exam = null;
        if (request.getExamId() != null) {
            exam = examService.getExamById(request.getExamId());
        }
        Specification<Question> specification = Specification.where(questionSpecification.equalExam(exam))
            .and(questionSpecification.equalId(request.getId()));
        Page<Question> page = questionService.getQuestion(specification, request.getPageable());
        List<QuestionResponse> questions = page.getContent().parallelStream().map(question -> {
            List<Option> options = optionService.getOptionsByQuestion(question.getId());
            List<FillCorrect> fillCorrects = new ArrayList<>(fillCorrectService.getByQuestion(question.getId()));
            return new QuestionResponse(question, options, fillCorrects);
        }).collect(Collectors.toList());
        return new GetQuestionResponse(questions, new Paginate(page));
    }
}
