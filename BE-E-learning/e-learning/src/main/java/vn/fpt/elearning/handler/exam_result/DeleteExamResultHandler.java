package vn.fpt.elearning.handler.exam_result;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.exam_result.request.DeleteExamResultRequest;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;

@Component
@RequiredArgsConstructor
public class DeleteExamResultHandler extends RequestHandler<DeleteExamResultRequest, StatusResponse> {

    private final IExamResultService examResultService;

    @Override
    public StatusResponse handle(DeleteExamResultRequest request) {
        ExamResult examResult = examResultService.getExamResultById(request.getId());
        if (examResult == null) {
            throw new InternalException(ResponseCode.EXAM_RESULT_NOT_FOUND);
        }
        examResultService.deleteExamResultById(request.getId());
        return new StatusResponse(true);
    }
}
