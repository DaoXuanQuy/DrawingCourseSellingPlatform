package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SetDiscountPercentageRequest extends BaseRequestData {
    @NotBlank
    private String courseId;
    @NotNull
    @Min(0)
    @Max(100)
    private Integer discountPercentage;
}
