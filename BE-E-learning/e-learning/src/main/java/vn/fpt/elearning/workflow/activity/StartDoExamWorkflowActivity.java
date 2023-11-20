package vn.fpt.elearning.workflow.activity;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.common.Constant;
import vn.fpt.elearning.dtos.answer.request.SubmitAnswerRequest;
import vn.fpt.elearning.dtos.answer.request.SubmitAnswersRequest;
import vn.fpt.elearning.entity.*;
import vn.fpt.elearning.enums.ExamResultStatus;
import vn.fpt.elearning.enums.ExamType;
import vn.fpt.elearning.enums.QuestionType;
import vn.fpt.elearning.service.RedisService;
import vn.fpt.elearning.service.interfaces.*;
import vn.fpt.elearning.workflow.activity.interfaces.IStartDoExamWorkflowActivity;


import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@EnableAsync
@Slf4j
public class StartDoExamWorkflowActivity implements IStartDoExamWorkflowActivity {
    private final IExamResultService examResultService;
    private final RedisService redisService;
    private final IQuestionService questionService;
    private final IFillCorrectService fillCorrectService;
    private final IOptionService optionService;
    private final IAnswerService answerService;

    @Override
    public void activity(String code) {
        log.debug("Finish {}", code);
        SubmitAnswersRequest request = redisService.getValue(Constant.REDIS_ANSWERS_PREFIX + code, SubmitAnswersRequest.class);
        redisService.deleteKey(Constant.REDIS_ANSWERS_PREFIX + code);
        ExamResult examResult = examResultService.getByCodeNotNull(code);
        if (examResult.getScore() != null) {
            return;
        }
        if (request == null || request.getAnswers() == null || request.getAnswers().isEmpty()) {
            examResult.setTime(LocalDateTime.now())
                .setCorrectTotal(0)
                .setScore((double) 0);
            examResultService.save(examResult);
            return;
        }
        User user = examResult.getUser();
        Exam exam = examResult.getExam();
        List<Answer> answers = new ArrayList<>();
        double score = 0;
        int correct = 0;
        for (SubmitAnswerRequest smAnswer : request.getAnswers()) {
            boolean isCorrect = false;
            Question question = questionService.getQuestionById(smAnswer.getQuestionId());
            if (question != null && StringUtils.equals(exam.getId(), question.getExam().getId())) {

                Answer answer = new Answer()
                    .setUser(user)
                    .setQuestion(question);
                switch (question.getQuestionType()) {
                    case FILL:
                        Set<FillCorrect> fillCorrects = fillCorrectService.getAllByIds(smAnswer.getFillAnswers().parallelStream().map(SubmitAnswerRequest.FillAnswerInfo::getId).collect(Collectors.toList()));
                        Map<String, SubmitAnswerRequest.FillAnswerInfo> fillCorrectMap = smAnswer.getFillAnswers().stream().collect(Collectors.toMap(SubmitAnswerRequest.FillAnswerInfo::getId, Function.identity()));
                        Set<FillAnswer> fillAnswers = fillCorrects.stream()
                            .map(
                                fillCorrect -> new FillAnswer()
                                    .setAnswer(fillCorrectMap.get(fillCorrect.getId()).getAnswer())
                                    .setFillCorrect(fillCorrect)
                            )
                            .collect(Collectors.toSet());
                        answer.setFillAnswers(fillAnswers);
                        Set<FillCorrect> correctFillQuestion = fillCorrectService.getByQuestion(question.getId());
                        if (fillCorrects.size() == correctFillQuestion.size()) {
                            isCorrect = true;
                            for (FillCorrect fillCorrect : correctFillQuestion) {
                                if (!StringUtils.equals(fillCorrect.getAnswer(), fillCorrectMap.get(fillCorrect.getId()).getAnswer())) {
                                    isCorrect = false;
                                    break;
                                }
                            }
                        }
                        break;
                    case ONLY_ONE:
                        if (ObjectUtils.isNotEmpty(smAnswer.getOptions())) {
                            Option option = optionService.getOptionByIdNotNull(smAnswer.getOptions().get(0));
                            if (StringUtils.equals(option.getQuestion().getId(), question.getId())) {
                                Set<Option> options = new HashSet<>();
                                options.add(option);
                                answer.setOptions(options);
                                if (Boolean.TRUE.equals(option.getCorrect())) {
                                    isCorrect = true;
                                }
                            }
                        }
                        break;
                    case MULTIPLE_SELECT:
                        if (ObjectUtils.isNotEmpty(smAnswer.getOptions())) {
                            Set<Option> options = optionService.getByIds(smAnswer.getOptions());
                            answer.setOptions(options);
                            Set<Option> correctOptions = optionService.getCorrectOptionsByQuestion(question.getId());
                            if (options.equals(correctOptions)) {
                                isCorrect = true;
                            }
                        }
                        break;
                    case ESSAY:
                        answer.setFillAnswer(smAnswer.getFillAnswer());
                }
                answer.setCode(code);
                answers.add(answer);
                if (isCorrect) {
                    score += question.getPoint();
                    correct++;
                }

            }
        }
        answerService.saveAll(answers);
        examResult.setTime(LocalDateTime.now());
        if (ExamType.QUIZ.equals(exam.getExamType())) {
            examResult.setScore(score);
            examResult.setCorrectTotal(correct);
            examResult.setStatus(ExamResultStatus.COMPLETE);
            examResultService.save(examResult);
            return;
        }
        examResult.setStatus(ExamResultStatus.WAITING);
        examResultService.save(examResult);


    }
}
