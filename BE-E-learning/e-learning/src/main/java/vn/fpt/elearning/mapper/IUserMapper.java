package vn.fpt.elearning.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import vn.fpt.elearning.entity.District;
import vn.fpt.elearning.entity.Province;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.entity.Ward;
import vn.fpt.elearning.model.address.DistrictDto;
import vn.fpt.elearning.model.address.ProvinceDto;
import vn.fpt.elearning.model.address.WardDto;
import vn.fpt.elearning.model.chat.UserInfoChat;
import vn.fpt.elearning.model.user.UserDto;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface IUserMapper {

    UserDto toUserDto(User user);

    User toUser(UserDto userDto);

    ProvinceDto toProvinceDto(Province province);

    Province toProvince(ProvinceDto provinceDto);

    WardDto toWardDto(Ward ward);

    Ward toWard(WardDto wardDto);

    DistrictDto toDistrictDto(District district);

    District toDistrict(DistrictDto districtDto);

    List<UserDto> toListUserDto(List<User> users);
    List<UserInfoChat> toListUserInfoChat(List<User> users);
}
