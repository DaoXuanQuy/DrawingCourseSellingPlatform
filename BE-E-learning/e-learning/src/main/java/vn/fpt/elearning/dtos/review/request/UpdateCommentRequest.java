package vn.fpt.elearning.dtos.review.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCommentRequest extends BaseRequestData {
    @NotBlank
    private String id;
    @NotBlank
    private String comment;
}
