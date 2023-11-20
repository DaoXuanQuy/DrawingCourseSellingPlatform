package vn.fpt.elearning.dtos.document.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.DocumentType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
public class UpdateDocumentRequest extends BaseRequestData {
    @NotBlank
    private String id;
    @NotBlank
    private String documentName;
    @NotNull
    private DocumentType documentType;
    private String content;
    private MultipartFile file;
    private String videoUrl;
    private String description;
}
