package vn.fpt.elearning.handler.exam_result;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam_result.request.GetDetailExamResultRequest;
import vn.fpt.elearning.dtos.exam_result.response.GetDetailExamResultResponse;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;

@Component
@RequiredArgsConstructor
public class GetDetailExamResultHandler extends RequestHandler<GetDetailExamResultRequest, GetDetailExamResultResponse> {

    private final IExamResultService examResultService;

    @Override
    public GetDetailExamResultResponse handle(GetDetailExamResultRequest request) {
        ExamResult examResult = examResultService.getExamResultById(request.getId());
        if (examResult == null) {
            throw new InternalException(ResponseCode.EXAM_RESULT_NOT_FOUND);
        }
        return new GetDetailExamResultResponse(examResult);
    }
}
