package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmitChoose {
    @NotBlank
    private Long questionId;
    @NotBlank
    private String userId;

    private String choose;
}
