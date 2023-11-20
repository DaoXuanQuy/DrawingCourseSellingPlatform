package vn.fpt.elearning.handler.document;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.document.request.GetDocumentForStudentRequest;
import vn.fpt.elearning.dtos.document.response.GetListDocumentResponse;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.mapper.IDocumentMapper;
import vn.fpt.elearning.model.DocumentDto;
import vn.fpt.elearning.service.interfaces.IDocumentService;
import vn.fpt.elearning.service.interfaces.IProgressService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetDocumentForStudentHandler extends RequestHandler<GetDocumentForStudentRequest, GetListDocumentResponse> {
    private final IDocumentMapper iDocumentMapper;
    private final IDocumentService iDocumentService;
    private final IProgressService progressService;

    @Override
    public GetListDocumentResponse handle(GetDocumentForStudentRequest request) {
        List<Document> documents = iDocumentService.getDocumentForStudent(request.getLessonId(), request.getUserId());
        List<DocumentDto> documentDtos = iDocumentMapper.toListDocumentDto(documents);
        documentDtos = documentDtos.parallelStream().map(documentDto -> documentDto.setDone(progressService.existsDocumentProgress(documentDto.getId(), request.getUserId()))).collect(Collectors.toList());
        return new GetListDocumentResponse(documentDtos);
    }
}
