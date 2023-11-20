package vn.fpt.elearning.dtos.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseResponseData;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class CmsBanUserResponse extends BaseResponseData {
    private String message;
    private boolean success;
}
