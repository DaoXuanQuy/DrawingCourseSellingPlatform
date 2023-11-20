package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.*;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCourseRequest extends BaseRequestData {

    @NotBlank
    private String id;

    @NotBlank
    @Size(max = 40)
    private String courseName;

    private MultipartFile courseImage;

    private String description;

    @NotNull
    @Min(value = 0)
    private Long price;

    @Min(0)
    @Max(100)
    private Integer discountPercentage;
}
