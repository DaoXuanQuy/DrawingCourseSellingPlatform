package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.anotation.file.File;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class CreateCourseRequest extends BaseRequestData {
    @NotBlank
    @Size(max = 40)
    private String courseName;

    @NotNull
    @File(
            extensions = {"jpg", "jpeg", "png"},
            message = "File size exceed 10MB or incorrect format"
    )
    private MultipartFile courseImage;

    private String description;

    @NotNull
    @Min(value = 0)
    private Long price;
}
