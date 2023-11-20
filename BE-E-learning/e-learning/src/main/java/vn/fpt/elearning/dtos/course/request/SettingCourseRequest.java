package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.CourseStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class SettingCourseRequest extends BaseRequestData {
    @NotBlank
    private String id;
    @NotNull
    private CourseStatus status;
}
