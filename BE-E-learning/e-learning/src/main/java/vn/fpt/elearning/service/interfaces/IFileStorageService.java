package vn.fpt.elearning.service.interfaces;

import org.springframework.web.multipart.MultipartFile;

public interface IFileStorageService {
    String uploadFile(MultipartFile file);
}
