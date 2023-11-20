package vn.fpt.elearning.handler.file_storage;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.file_storage.request.UploadFileRequest;
import vn.fpt.elearning.dtos.file_storage.response.UploadFileResponse;
import vn.fpt.elearning.service.interfaces.IFileStorageService;

@Component
@RequiredArgsConstructor
public class UploadFileHandler extends RequestHandler<UploadFileRequest, UploadFileResponse> {
    private final IFileStorageService fileStorageService;

    @Override
    public UploadFileResponse handle(UploadFileRequest request) {
        String urlResponse =  fileStorageService.uploadFile(request.getFile());
        return new UploadFileResponse(urlResponse);
    }
}
