package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.ProgressType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DecreaseProgressRequest extends BaseRequestData {
    @NotBlank
    private String id;
    @NotNull
    private ProgressType type;
}
