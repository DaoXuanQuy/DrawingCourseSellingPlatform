package vn.fpt.elearning.dtos.auth.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.common.ConstantRegex;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class LoginCmsRequest extends BaseRequestData {
    @Pattern(regexp = ConstantRegex.PHONE_REGEX)
    private String phone;

    @Size(min = 8, max = 20)
    private String password;
}
