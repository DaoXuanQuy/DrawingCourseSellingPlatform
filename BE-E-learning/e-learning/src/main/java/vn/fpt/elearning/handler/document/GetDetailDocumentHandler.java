package vn.fpt.elearning.handler.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.document.request.GetDetailDocumentRequest;
import vn.fpt.elearning.dtos.document.response.GetDetailDocumentResponse;
import vn.fpt.elearning.entity.Document;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IDocumentMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IDocumentService;

@Component
@RequiredArgsConstructor
public class GetDetailDocumentHandler extends RequestHandler<GetDetailDocumentRequest, GetDetailDocumentResponse> {

    private final IDocumentService documentService;
    private final IDocumentMapper iDocumentMapper;

    @Override
    public GetDetailDocumentResponse handle(GetDetailDocumentRequest request) {
        Document document = documentService.getDocumentById(request.getId());
        if (document == null) {
            throw new InternalException(ResponseCode.DOCUMENT_NOT_FOUND);
        }
        return new GetDetailDocumentResponse(iDocumentMapper.toDocumentDto(document));
    }
}
