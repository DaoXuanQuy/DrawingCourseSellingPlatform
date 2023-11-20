package vn.fpt.elearning.dtos.auth.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.Gender;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest extends BaseRequestData {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private LocalDate birthday;
    private Gender gender;
}
