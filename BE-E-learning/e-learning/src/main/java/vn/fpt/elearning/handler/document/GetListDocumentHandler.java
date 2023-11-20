package vn.fpt.elearning.handler.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.document.request.GetLIstDocumentRequest;
import vn.fpt.elearning.dtos.document.response.GetListDocumentResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IDocumentMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IDocumentService;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetListDocumentHandler extends RequestHandler<GetLIstDocumentRequest, GetListDocumentResponse> {
    private final IDocumentService iDocumentService;
    private final IDocumentMapper iDocumentMapper;
    private final ICourseService iCourseService;

    @Override
    public GetListDocumentResponse handle(GetLIstDocumentRequest request) {
        Course course = iCourseService.getByTeacherOrUser(request.getCourseId(), request.getUserId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_TEACHER_OR_USER_REGISTER);
        }
        List<Document> documents = iDocumentService.getByLessonId(request.getLessonId());
        return new GetListDocumentResponse(iDocumentMapper.toListDocumentDto(documents));
    }
}
