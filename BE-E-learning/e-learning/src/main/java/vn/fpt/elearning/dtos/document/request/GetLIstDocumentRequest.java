package vn.fpt.elearning.dtos.document.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.DocumentType;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class GetLIstDocumentRequest extends BaseRequestData {
    private String courseId;
    private String lessonId;
    private String documentName;
    private DocumentType documentType;
}
