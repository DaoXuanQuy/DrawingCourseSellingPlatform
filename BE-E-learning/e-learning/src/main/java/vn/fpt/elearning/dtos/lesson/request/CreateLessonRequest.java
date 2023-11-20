package vn.fpt.elearning.dtos.lesson.request;

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
public class CreateLessonRequest extends BaseRequestData {
    @NotBlank
    private String courseId;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
}
