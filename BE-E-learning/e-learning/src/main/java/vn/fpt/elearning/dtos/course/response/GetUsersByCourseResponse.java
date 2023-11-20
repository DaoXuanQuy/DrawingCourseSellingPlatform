package vn.fpt.elearning.dtos.course.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.user.UserDto;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetUsersByCourseResponse extends BaseResponseData {
    private List<UserDto> users;
    private Paginate paginate;
}
