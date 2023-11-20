package vn.fpt.elearning.handler.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.document.request.DeleteDocumentRequest;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IDocumentService;

@Component
@RequiredArgsConstructor
public class DeleteDocumentHandler extends RequestHandler<DeleteDocumentRequest, StatusResponse> {

    private final IDocumentService documentService;

    @Override
    public StatusResponse handle(DeleteDocumentRequest request) {
        Document document = documentService.getDocumentById(request.getId());
        if (document == null) {
            throw new InternalException(ResponseCode.DOCUMENT_NOT_FOUND);
        }
        documentService.deleteDocumentById(request.getId());
        return new StatusResponse(true);
    }
}
