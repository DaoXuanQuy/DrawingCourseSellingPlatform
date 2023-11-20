package vn.fpt.elearning.handler.exam_result;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam_result.request.GetUngradedExamsRequest;
import vn.fpt.elearning.dtos.exam_result.response.GetUngradedExamsResponse;
import vn.fpt.elearning.dtos.exam_result.response.UngradedExamResponse;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.repository.ExamResultRepository;
import vn.fpt.elearning.service.interfaces.ITeacherService;

@Component
@RequiredArgsConstructor
public class GetUngradedExamsHandler extends RequestHandler<GetUngradedExamsRequest, GetUngradedExamsResponse> {

    private final ExamResultRepository examResultRepository;
    private final ITeacherService teacherService;
    @Override
    public GetUngradedExamsResponse handle(GetUngradedExamsRequest request) {
        Teacher teacher = teacherService.getByUserId(request.getUserId());
        if (teacher == null) {
            throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
        }
        Page<UngradedExamResponse> examResponses = examResultRepository.findUngradedExams(request.getExamId(), teacher.getId(), request.getStatus(), request.getPageable());
        return new GetUngradedExamsResponse(examResponses.getContent(), new Paginate(examResponses));
    }
}
