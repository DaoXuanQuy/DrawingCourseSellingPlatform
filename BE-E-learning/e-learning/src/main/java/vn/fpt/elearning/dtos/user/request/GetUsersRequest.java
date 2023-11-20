package vn.fpt.elearning.dtos.user.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.Gender;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class GetUsersRequest extends BaseRequestData {
    @JsonIgnore
    private Pageable pageable;
    private String firstName;
    private String avatar;
    private String lastName;
    private Gender gender;
    private String phone;
    private String email;
    private LocalDate birthday;
    private Integer homeNumber;
    private String streetName;
    private String wards;
    private String district;
    private String city;
}
