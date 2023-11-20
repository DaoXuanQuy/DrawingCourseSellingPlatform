package vn.fpt.elearning.dtos.user.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class CmsUpdateInfoByIdRequest extends BaseRequestData {
    @JsonIgnore
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate birthday;
    private Gender gender;
    private int homeNumber;
    private String streetName;
    private String avatar;
    private Long provinceId;
    private Long districtId;
    private Long wardId;
}
