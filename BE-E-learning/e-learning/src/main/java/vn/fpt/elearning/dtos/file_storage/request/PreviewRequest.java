package vn.fpt.elearning.dtos.file_storage.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PreviewRequest extends BaseRequestData {
    @NotBlank
    private String objectName;
}
