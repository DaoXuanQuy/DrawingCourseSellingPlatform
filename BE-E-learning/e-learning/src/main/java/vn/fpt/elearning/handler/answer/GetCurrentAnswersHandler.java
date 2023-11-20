package vn.fpt.elearning.handler.answer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.common.Constant;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.answer.request.GetCurrentAnswerRequest;
import vn.fpt.elearning.dtos.answer.request.SubmitAnswersRequest;
import vn.fpt.elearning.dtos.answer.response.GetCurrentAnswerResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.RedisService;
import vn.fpt.elearning.service.interfaces.IExamResultService;

import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
public class GetCurrentAnswersHandler extends RequestHandler<GetCurrentAnswerRequest, GetCurrentAnswerResponse> {

    private final IExamResultService examResultService;
    private final RedisService redisService;

    @Override
    public GetCurrentAnswerResponse handle(GetCurrentAnswerRequest request) {
        ExamResult examResult = examResultService.getByCodeNotNull(request.getCode());
        if (examResult == null) {
            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
        }
        if (examResult.getScore() != null) {
            throw new InternalException(ResponseCode.EXAM_RESULT_COMPLETED);
        }
        Exam exam = examResult.getExam();
        Long timeSecond = Timestamp.valueOf(examResult.getCreateDate().plusMinutes(exam.getTimeMinute())).getTime();
        SubmitAnswersRequest value = redisService.getValue(Constant.REDIS_ANSWERS_PREFIX + request.getCode(), SubmitAnswersRequest.class);
        if (value == null) {
            return new GetCurrentAnswerResponse().setTimestamp(timeSecond);
        }
        return new GetCurrentAnswerResponse(value.getAnswers(), timeSecond);
    }
}
