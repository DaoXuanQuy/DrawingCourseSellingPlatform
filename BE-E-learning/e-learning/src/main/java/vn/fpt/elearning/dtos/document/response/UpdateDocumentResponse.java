package vn.fpt.elearning.dtos.document.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.DocumentDto;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class UpdateDocumentResponse extends BaseResponseData {
    private DocumentDto document;
}
