package vn.fpt.elearning.dtos.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.user.UserDto;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class GetInfoResponse extends BaseResponseData {
    private UserDto user;
}
