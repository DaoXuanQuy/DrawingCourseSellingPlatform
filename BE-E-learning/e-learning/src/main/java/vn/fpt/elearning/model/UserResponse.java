package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.enums.Gender;
import vn.fpt.elearning.entity.District;
import vn.fpt.elearning.entity.Province;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.entity.Ward;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class UserResponse extends BaseResponseData {
    private String id;

    private String firstName;

    private String lastName;

    private LocalDate birthday;

    private Gender gender;

    private ProvinceModel province;

    private DistrictModel district;

    private WardModel ward;

    private String streetName;

    private int homeNumber;

    private LocalDateTime createDate;

    private String email;

    private String phone;

    private boolean active;

    private String avatar;

    private Boolean ban;

    private Boolean delete;

    private Boolean isOrc;

    public UserResponse(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.birthday = user.getBirthday();
        this.gender = user.getGender();
        Province userProvince = user.getProvince();
        District userDistrict = user.getDistrict();
        Ward userWard = user.getWard();
        this.province = userProvince == null ? null : new ProvinceModel(userProvince);
        this.district = userDistrict == null ? null : new DistrictModel(userDistrict);
        this.ward = userWard == null ? null : new WardModel(userWard);
        this.streetName = user.getStreetName();
        this.homeNumber = user.getHomeNumber();
        this.createDate = user.getCreateDate();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.active = user.isActive();
        this.avatar = user.getAvatar();
        this.ban = user.getBan();
        this.delete = user.getDelete();
        this.isOrc = user.getIsOrc();
    }

}
