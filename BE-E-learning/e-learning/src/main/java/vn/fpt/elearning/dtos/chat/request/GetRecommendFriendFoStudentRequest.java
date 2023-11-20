package vn.fpt.elearning.dtos.chat.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import vn.fpt.elearning.core.BaseRequestData;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GetRecommendFriendFoStudentRequest extends BaseRequestData {
    private Pageable pageable;
}
