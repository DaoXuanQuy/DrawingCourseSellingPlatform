package vn.fpt.elearning.dtos.file_storage.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotEmpty;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UploadFileRequest extends BaseRequestData {
    @NotEmpty
    private MultipartFile file;
}
