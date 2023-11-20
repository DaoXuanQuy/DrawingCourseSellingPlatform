package vn.fpt.elearning.handler.file_storage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.file_storage.request.MultiUploadRequest;
import vn.fpt.elearning.dtos.file_storage.response.MultiUploadResponse;
import vn.fpt.elearning.service.interfaces.IFileStorageService;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class MultiUploadHandler extends RequestHandler<MultiUploadRequest, MultiUploadResponse> {
    private final IFileStorageService fileStorageService;

    @Override
    public MultiUploadResponse handle(MultiUploadRequest request) {
        List<String> urls = new ArrayList<>();
        try {
        request.getFiles().parallelStream().forEach(file -> {
            urls.add(fileStorageService.uploadFile(file));
        });} catch (Exception e) {
            log.info("Tải nhiều ảnh lỗi: {}", e.getMessage());
        }
        return new MultiUploadResponse(urls);
    }
}
