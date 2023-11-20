package vn.fpt.elearning.handler.document;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.document.request.UpdateDocumentRequest;
import vn.fpt.elearning.dtos.document.response.UpdateDocumentResponse;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.entity.Lesson;
import vn.fpt.elearning.enums.DocumentType;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IDocumentMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.MinIOService;
import vn.fpt.elearning.service.interfaces.IDocumentService;

@Component
@RequiredArgsConstructor
public class UpdateDocumentHandler extends RequestHandler<UpdateDocumentRequest, UpdateDocumentResponse> {
    private final IDocumentService documentService;
    private final IDocumentMapper iDocumentMapper;
    private final MinIOService minIOService;

    @SneakyThrows
    @Override
    public UpdateDocumentResponse handle(UpdateDocumentRequest request) {
        Document document = documentService.getDocumentByIdAndCreateBy(request.getId(), request.getUserId());
        if (document == null) {
            throw new InternalException(ResponseCode.DOCUMENT_NOT_FOUND);
        }
        Lesson lesson = document.getLesson();
        MultipartFile file = request.getFile();
        if (file != null) {
            String objectName = String.format(
                    "%s_%s_%s_%s.%s", lesson.getCourse().getCourseName(), lesson.getName(),
                    file.getResource().getFilename(), System.currentTimeMillis(), FilenameUtils.getExtension(file.getOriginalFilename())
            );
            objectName = minIOService.uploadFile(objectName, file.getBytes(), file.getContentType(), true);
            document.setDocumentUrl(objectName);
        }
        document.setLesson(lesson);
        document.setDocumentName(request.getDocumentName());
        document.setContent(request.getContent());
        document.setDescription(request.getDescription());
        if (request.getDocumentType().equals(DocumentType.VIDEO)) {
            document.setDocumentUrl(request.getVideoUrl());
        }
        document = documentService.createDocument(document);
        return new UpdateDocumentResponse(iDocumentMapper.toDocumentDto(document));
    }
}
