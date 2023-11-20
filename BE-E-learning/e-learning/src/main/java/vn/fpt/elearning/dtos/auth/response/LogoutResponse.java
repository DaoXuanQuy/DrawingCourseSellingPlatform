package vn.fpt.elearning.dtos.auth.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LogoutResponse extends BaseResponseData {
    private boolean success = true;
}
