package vn.fpt.elearning.handler.answer;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.answer.request.SubmitAnswerRequest;
import vn.fpt.elearning.dtos.answer.request.SubmitAnswersRequest;
import vn.fpt.elearning.dtos.answer.response.SubmitAnswersResponse;
import vn.fpt.elearning.entity.*;
import vn.fpt.elearning.enums.*;
import vn.fpt.elearning.service.interfaces.*;

import vn.fpt.elearning.exception.InternalException;


import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SubmitAnswersHandler extends RequestHandler<SubmitAnswersRequest, SubmitAnswersResponse> {

    private final IAnswerService answerService;
    private final IUserService userService;
    private final IQuestionService questionService;
    private final IOptionService optionService;
    private final IExamResultService examResultService;
    private final IFillCorrectService fillCorrectService;

    @Override
    @Transactional
    public SubmitAnswersResponse handle(SubmitAnswersRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null || Boolean.TRUE.equals(user.getBan())) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        ExamResult examResult = examResultService.getByCodeNotNull(request.getCode());
        if (!StringUtils.equals(examResult.getUser().getId(), user.getId())) {
            throw new InternalException(ResponseCode.USER_INVALID);
        }
        if (examResult.getTime() != null) {
            return new SubmitAnswersResponse(examResult.getScore(), examResult.getCorrectTotal());
        }
        Exam exam = examResult.getExam();
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
        List<Answer> answers = new ArrayList<>();
        double score = 0;
        int correct = 0;
        String code = request.getCode();
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
            examResult = examResultService.save(examResult);
            return new SubmitAnswersResponse(examResult.getScore(), examResult.getCorrectTotal());
        }
        examResult.setStatus(ExamResultStatus.WAITING);
        examResultService.save(examResult);
        return new SubmitAnswersResponse();
    }
}
