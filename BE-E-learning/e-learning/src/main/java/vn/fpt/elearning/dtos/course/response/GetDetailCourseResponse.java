package vn.fpt.elearning.dtos.course.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.course.CourseDto;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class GetDetailCourseResponse extends BaseResponseData {
    private CourseDto course;
}
