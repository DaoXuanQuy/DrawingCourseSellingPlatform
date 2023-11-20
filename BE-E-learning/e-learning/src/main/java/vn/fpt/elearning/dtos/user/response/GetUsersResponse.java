package vn.fpt.elearning.dtos.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.UserResponse;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class GetUsersResponse extends BaseResponseData {
    private List<UserResponse> users;
    private Paginate paginate;
}
