package vn.fpt.elearning.dtos.ekyc.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class DetectIdCardRequest extends BaseRequestData {
    @NotNull
    private MultipartFile imageFront;
    @NotNull
    private MultipartFile imageBack;
}
