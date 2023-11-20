package vn.fpt.elearning.handler.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.document.request.DisplayDocumentRequest;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IDocumentService;

@Component
@RequiredArgsConstructor
public class DisplayDocumentHandler extends RequestHandler<DisplayDocumentRequest, StatusResponse> {
    private final IDocumentService iDocumentService;

    @Override
    public StatusResponse handle(DisplayDocumentRequest request) {
        Document document = iDocumentService.getDocumentByIdAndCreateBy(request.getDocumentId(), request.getUserId());
        if (document == null) {
            throw new InternalException(ResponseCode.DOCUMENT_NOT_FOUND);
        }
        if (document.getDisplayStatus().equals(request.getStatus())) {
            throw new InternalException(ResponseCode.DOCUMENT_DISPLAY_FAILED);
        }
        document.setDisplayStatus(request.getStatus());
        iDocumentService.createDocument(document);
        return new StatusResponse();
    }
}
