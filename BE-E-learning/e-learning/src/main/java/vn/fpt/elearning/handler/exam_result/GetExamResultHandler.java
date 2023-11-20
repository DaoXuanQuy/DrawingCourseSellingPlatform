package vn.fpt.elearning.handler.exam_result;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam_result.request.GetExamResultRequest;
import vn.fpt.elearning.dtos.exam_result.response.GetDetailExamResultResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class GetExamResultHandler extends RequestHandler<GetExamResultRequest, GetDetailExamResultResponse> {

    private final IExamResultService examResultService;
    private final IUserService userService;
    private final IExamService examService;
    @Override
    public GetDetailExamResultResponse handle(GetExamResultRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Exam exam = examService.getExamById(request.getExamId());
        if (exam == null) {
            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
        }
        ExamResult examResult = examResultService.getByStudentAndExam(user.getId(), exam.getId());
        if (examResult == null) {
            throw new InternalException(ResponseCode.EXAM_RESULT_NOT_FOUND);
        }
        return new GetDetailExamResultResponse(examResult);
    }
}
