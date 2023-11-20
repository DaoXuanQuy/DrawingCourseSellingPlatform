package vn.fpt.elearning.handler.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.exam.request.GetExamByLessonRequest;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.dtos.exam.response.GetExamByLessonResponse;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.IExamService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GetExamByCourseIdHandler extends RequestHandler<GetExamByLessonRequest, GetExamByLessonResponse> {
    private final IExamService examService;
    @Override
    public GetExamByLessonResponse handle(GetExamByLessonRequest request) {
        String lessonId = request.getLessonId();
        Page<Exam> page = examService.getExamByLessonId(lessonId, request.getPageable());
        List<ExamResponse> list = page.getContent().parallelStream().map(ExamResponse::new).collect(Collectors.toList());
        return new GetExamByLessonResponse(list, new Paginate(page));
    }
}
