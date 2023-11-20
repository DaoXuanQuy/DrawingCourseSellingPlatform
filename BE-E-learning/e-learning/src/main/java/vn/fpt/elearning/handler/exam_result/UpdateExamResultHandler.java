package vn.fpt.elearning.handler.exam_result;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam_result.request.UpdateExamResultRequest;
import vn.fpt.elearning.dtos.exam_result.response.UpdateExamResultResponse;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ExamResultStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IExamService;

@Component
@RequiredArgsConstructor
public class UpdateExamResultHandler extends RequestHandler<UpdateExamResultRequest, UpdateExamResultResponse> {

    private final IExamResultService examResultService;
    private final IExamService examService;

    @Override
    public UpdateExamResultResponse handle(UpdateExamResultRequest request) {
        ExamResult examResult = examResultService.getExamResultById(request.getId());
        if (examResult == null) {
            throw new InternalException(ResponseCode.EXAM_RESULT_NOT_FOUND);
        }
        Double maxExamScore = examService.getMaxExamScore(examResult.getExam().getId());
        if (request.getScore() > maxExamScore) {
            throw new InternalException(ResponseCode.SCORE_INVALID);
        }
        examResult.setScore(request.getScore());
        examResult.setCorrectTotal(request.getCorrectTotal());
        examResult.setComment(request.getComment());
        examResult.setStatus(ExamResultStatus.COMPLETE);
        examResult = examResultService.save(examResult);
        if (examResult == null) {
            throw new InternalException(ResponseCode.EXAM_RESULT_UPDATED_FAILED);
        }
        return new UpdateExamResultResponse(examResult);
    }
}
