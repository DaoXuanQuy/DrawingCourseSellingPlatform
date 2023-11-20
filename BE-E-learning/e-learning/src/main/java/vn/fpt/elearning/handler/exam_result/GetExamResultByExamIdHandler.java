package vn.fpt.elearning.handler.exam_result;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam_result.request.GetExamResultByExamIdRequest;
import vn.fpt.elearning.dtos.exam_result.response.GetDetailExamResultResponse;
import vn.fpt.elearning.dtos.exam_result.response.GetExamResultByExamIdResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IExamResultService;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.specifications.ExamResultSpecification;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GetExamResultByExamIdHandler extends RequestHandler<GetExamResultByExamIdRequest, GetExamResultByExamIdResponse> {
    private final IExamResultService examResultService;
    private final IExamService examService;
    private final ExamResultSpecification examResultSpecification;
    @Override
    public GetExamResultByExamIdResponse handle(GetExamResultByExamIdRequest request) {
        Exam exam = examService.getExamById(request.getExamId());
        if (exam == null) {
            throw new InternalException(ResponseCode.EXAM_NOT_FOUND);
        }
        Specification<ExamResult> specification = Specification
            .where(examResultSpecification.equalExamId(exam.getId()));
        Page<ExamResult> page = examResultService.getAll(specification, request.getPageable());
        List<GetDetailExamResultResponse> listResponse = page.getContent().parallelStream().map(GetDetailExamResultResponse::new).collect(Collectors.toList());
        return new GetExamResultByExamIdResponse(listResponse, new Paginate(page));
    }
}
