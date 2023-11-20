package vn.fpt.elearning.dtos.user.request;

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
public class GetUnregisterCourseRequest extends BaseRequestData {
    private Pageable pageable;
}
