package vn.fpt.elearning.dtos.option.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateOptionRequest extends BaseRequestData {
    @NotBlank
    private String optionName;
    @NotNull
    private Boolean correct;
}
