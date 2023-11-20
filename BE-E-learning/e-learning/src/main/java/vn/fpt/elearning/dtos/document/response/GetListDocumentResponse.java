package vn.fpt.elearning.dtos.document.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.DocumentDto;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetListDocumentResponse extends BaseResponseData {
    private List<DocumentDto> documents;
}
