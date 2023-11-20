package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewCourseRequest extends BaseRequestData {
    private String id;
}
