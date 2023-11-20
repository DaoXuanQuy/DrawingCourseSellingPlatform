package vn.fpt.elearning.dtos.review.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UpdateReviewRequest extends BaseRequestData {
    @NotBlank
    private String id;
    private String subject;
    private String content;
    @Min(0)
    @Max(5)
    private Integer star;
}
