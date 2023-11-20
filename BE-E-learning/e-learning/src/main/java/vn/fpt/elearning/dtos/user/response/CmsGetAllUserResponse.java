package vn.fpt.elearning.dtos.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.domain.Page;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.model.UserResponse;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class CmsGetAllUserResponse extends BaseResponseData {
    private List<UserResponse> users;
    private Paginate paginate;

    public CmsGetAllUserResponse(Page<User> users) {
        this.users = users.stream().map(UserResponse::new).collect(Collectors.toList());
        this.paginate = new Paginate(users);
    }
}
