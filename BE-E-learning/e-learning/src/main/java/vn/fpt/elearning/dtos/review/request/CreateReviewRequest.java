package vn.fpt.elearning.dtos.review.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewRequest extends BaseRequestData {
    @NotBlank
    private String courseId;
    @NotBlank
    private String subject;
    @NotBlank
    private String content;
    @NotNull
    @Min(0)
    @Max(5)
    private Integer star;
}
