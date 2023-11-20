package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
public class GetDetailCourseRequest extends BaseRequestData {
    @NotBlank
    private String id;
}
