package vn.fpt.elearning.handler.question;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.option.request.CreateOptionRequest;
import vn.fpt.elearning.dtos.question.request.CreateListQuestionRequest;
import vn.fpt.elearning.entity.*;
import vn.fpt.elearning.enums.FillType;
import vn.fpt.elearning.enums.QuestionType;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.model.FillCorrectInfo;
import vn.fpt.elearning.model.QuestionInfo;
import vn.fpt.elearning.service.interfaces.*;

import vn.fpt.elearning.exception.InternalException;


import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class CreateListQuestionHandler extends RequestHandler<CreateListQuestionRequest, StatusResponse> {
    private final IQuestionService questionService;
    private final IExamService examService;
    private final ICourseService courseService;
    private final IOptionService optionService;
    private final IUserService userService;
    private final IFillCorrectService fillCorrectService;
    @Override
    public StatusResponse handle(CreateListQuestionRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Course course = courseService.getCourseByExamId(request.getExamId());
        if (!user.getId().equals(course.getCreatedBy())) {
            throw new InternalException(ResponseCode.COURSE_INVALID);
        }
        Exam exam = examService.getExamById(request.getExamId());
        if (exam == null) {
            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
        }
        for (QuestionInfo createQuestionRequest : request.getQuestions()) {
            Question question = new Question();
            question.setExam(exam);
            question.setQuestionNo(createQuestionRequest.getQuestionNo());
            question.setQuestionName(createQuestionRequest.getQuestionName());
            question.setPoint(createQuestionRequest.getPoint());
            question.setQuestionType(createQuestionRequest.getQuestionType());
            question = questionService.createQuestion(question);
            List<Option> options;
            if (QuestionType.MULTIPLE_SELECT.equals(createQuestionRequest.getQuestionType())
                || QuestionType.ONLY_ONE.equals(createQuestionRequest.getQuestionType())) {
                if (createQuestionRequest.getOptions() != null && !createQuestionRequest.getOptions().isEmpty()) {
                    options = new ArrayList<>();
                    if (QuestionType.ONLY_ONE.equals(createQuestionRequest.getQuestionType())) {
                        int countCorrect = 0;
                        for (CreateOptionRequest createOptionRequest : createQuestionRequest.getOptions()) {
                            if (Boolean.TRUE.equals(createOptionRequest.getCorrect())) {
                                countCorrect++;
                            }
                        }
                        if (countCorrect != 1) {
                            throw new InternalException(ResponseCode.MUST_BE_ONLY_ONE_CORRECT_ANSWER);
                        }
                    }
                    for (CreateOptionRequest createOptionRequest : createQuestionRequest.getOptions()) {
                        Option option = new Option()
                            .setQuestion(question)
                            .setOptionName(createOptionRequest.getOptionName())
                            .setCorrect(createOptionRequest.getCorrect());
                        options.add(option);
                    }
                    optionService.saveAll(options);
                }
            } else if (QuestionType.FILL.equals(createQuestionRequest.getQuestionType())) {
                List<FillCorrectInfo> fillCorrectInfos = createQuestionRequest.getFillCorrects();
                if (CollectionUtils.isEmpty(fillCorrectInfos)) {
                    throw new InternalException(ResponseCode.MUST_BE_ONLY_ONE_CORRECT_ANSWER);
                }
                List<FillCorrect> fillCorrects = new ArrayList<>();
                for (FillCorrectInfo fillCorrectInfo : fillCorrectInfos) {
                    fillCorrects.add(new FillCorrect()
                        .setIndex(fillCorrectInfo.getIndex())
                        .setAnswer(fillCorrectInfo.getAnswer())
                        .setQuestion(question)
                        .setType(getFillType(fillCorrectInfo.getAnswer())));
                }
                fillCorrectService.saveAll(fillCorrects);
            }
        }
        return new StatusResponse(true);
    }
    private FillType getFillType(String text) {
        if (StringUtils.isBlank(text)) {
            return FillType.TEXT;
        }
        Pattern pattern = Pattern.compile("-?\\d+(\\.\\d+)?");
        return pattern.matcher(text).matches() ? FillType.NUMBER : FillType.TEXT;
    }
}
