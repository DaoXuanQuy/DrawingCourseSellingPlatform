package vn.fpt.elearning.dtos.document.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.DisplayStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class DisplayDocumentRequest extends BaseRequestData {
    @NotBlank
    private String documentId;
    @NotNull
    private DisplayStatus status;
}
