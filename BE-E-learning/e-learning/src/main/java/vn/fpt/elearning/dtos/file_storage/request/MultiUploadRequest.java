package vn.fpt.elearning.dtos.file_storage.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.BaseRequestData;

import java.util.List;

@Data
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
public class MultiUploadRequest extends BaseRequestData {
    private List<MultipartFile> files;
}
