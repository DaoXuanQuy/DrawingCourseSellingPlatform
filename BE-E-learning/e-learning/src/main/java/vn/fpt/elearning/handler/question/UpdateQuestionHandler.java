package vn.fpt.elearning.handler.question;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.option.request.CreateOptionRequest;
import vn.fpt.elearning.dtos.question.request.UpdateQuestionRequest;
import vn.fpt.elearning.dtos.question.response.QuestionResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.FillCorrect;
import vn.fpt.elearning.entity.Option;
import vn.fpt.elearning.entity.Question;
import vn.fpt.elearning.enums.FillType;
import vn.fpt.elearning.enums.QuestionType;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.model.FillCorrectInfo;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IFillCorrectService;
import vn.fpt.elearning.service.interfaces.IOptionService;
import vn.fpt.elearning.service.interfaces.IQuestionService;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Transactional
public class UpdateQuestionHandler extends RequestHandler<UpdateQuestionRequest, QuestionResponse> {
    private final IQuestionService questionService;
    private final IOptionService optionService;
    private final IFillCorrectService fillCorrectService;
    private final IExamResultService examResultService;

    @Override
    public QuestionResponse handle(UpdateQuestionRequest request) {
        Question question = questionService.getQuestionById(request.getId());
        Exam exam = question.getExam();
        if (examResultService.getTestAttempts(null, exam.getId(), true) > 0) {
            throw new InternalException(ResponseCode.HAVE_ATTEMPTS);
        }
        question.setQuestionNo(request.getQuestionNo());
        question.setQuestionName(request.getQuestionName());
        question.setPoint(request.getPoint());
        question.setQuestionType(request.getQuestionType());
        question = questionService.createQuestion(question);
        optionService.deleteAllByQuestionId(question.getId());
        fillCorrectService.deleteAllByQuestionId(question.getId());
        List<Option> options = null;
        List<FillCorrect> fillCorrects = null;
        if (QuestionType.MULTIPLE_SELECT.equals(request.getQuestionType())
            || QuestionType.ONLY_ONE.equals(request.getQuestionType())) {
            if (request.getOptions() != null && !request.getOptions().isEmpty()) {
                options = new ArrayList<>();
                if (QuestionType.ONLY_ONE.equals(request.getQuestionType())) {
                    int countCorrect = 0;
                    for (CreateOptionRequest createOptionRequest : request.getOptions()) {
                        if (Boolean.TRUE.equals(createOptionRequest.getCorrect())) {
                            countCorrect++;
                        }
                    }
                    if (countCorrect != 1) {
                        throw new InternalException(ResponseCode.MUST_BE_ONLY_ONE_CORRECT_ANSWER);
                    }
                }
                for (CreateOptionRequest createOptionRequest : request.getOptions()) {
                    Option option = new Option()
                        .setQuestion(question)
                        .setOptionName(createOptionRequest.getOptionName())
                        .setCorrect(createOptionRequest.getCorrect());
                    options.add(option);
                }
                optionService.saveAll(options);
            }
        } else if (QuestionType.FILL.equals(request.getQuestionType())) {
            List<FillCorrectInfo> fillCorrectInfos = request.getFillCorrects();
            if (CollectionUtils.isEmpty(fillCorrectInfos)) {
                throw new InternalException(ResponseCode.MUST_BE_ONLY_ONE_CORRECT_ANSWER);
            }
            fillCorrects = new ArrayList<>();
            for (FillCorrectInfo fillCorrectInfo : fillCorrectInfos) {
                fillCorrects.add(new FillCorrect()
                    .setIndex(fillCorrectInfo.getIndex())
                    .setAnswer(fillCorrectInfo.getAnswer())
                    .setQuestion(question)
                    .setType(getFillType(fillCorrectInfo.getAnswer())));
            }
            fillCorrectService.saveAll(fillCorrects);
        }
        return new QuestionResponse(question, options, fillCorrects);
    }
    private FillType getFillType(String text) {
        if (StringUtils.isBlank(text)) {
            return FillType.TEXT;
        }
        Pattern pattern = Pattern.compile("-?\\d+(\\.\\d+)?");
        return pattern.matcher(text).matches() ? FillType.NUMBER : FillType.TEXT;
    }
}
