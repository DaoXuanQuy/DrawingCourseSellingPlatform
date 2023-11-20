package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Pageable;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetUsersByCourseRequest extends BaseRequestData {
    private String courseId;
    private Pageable pageable;
}
