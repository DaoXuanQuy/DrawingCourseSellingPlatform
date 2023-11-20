package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.service.interfaces.IFileStorageService;

@Service
@RequiredArgsConstructor
@Deprecated(since = "04/06/2023")
public class FileStorageService implements IFileStorageService {
    private final MinIOService minIOService;

    @SneakyThrows
    @Override
    public String uploadFile(MultipartFile file){
        String objectName = String.format("%s_%s.png", file.getName(), System.currentTimeMillis());
        return minIOService.uploadFile(objectName, file.getBytes(), file.getContentType(), true);
    }
}
