package vn.fpt.elearning.dtos.admin.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.common.ConstantRegex;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class CreateAdminRequest extends BaseRequestData {
    @NotBlank
    @Pattern(regexp = ConstantRegex.PHONE_REGEX)
    private String phone;

    @NotBlank
    @Email
    private String email;

    @Size(min = 8, max = 20)
    private String password;

    @NotBlank
    private String fullName;
}
