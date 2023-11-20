package vn.fpt.elearning.handler.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.user.request.CmsUpdateInfoByIdRequest;
import vn.fpt.elearning.dtos.user.response.UpdateInfoResponse;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.AddressService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class CmsUpdateInfoByIdHandler extends RequestHandler<CmsUpdateInfoByIdRequest, UpdateInfoResponse> {
    private final IUserService userService;
    private final AddressService addressService;

    @Override
    public UpdateInfoResponse handle(CmsUpdateInfoByIdRequest request) {
        User user = userService.getUserById(request.getId());
        
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
    
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setBirthday(request.getBirthday());
        user.setGender(request.getGender());
        user.setAvatar(request.getAvatar() != null && !request.getAvatar().equals("") ? request.getAvatar() : user.getAvatar());
        user.setProvince(addressService.findProvinceById(request.getProvinceId()));
        user.setDistrict(addressService.findDistrictById(request.getDistrictId()));
        user.setWard(addressService.findWardById(request.getWardId()));
        user.setHomeNumber(request.getHomeNumber());
        user.setStreetName(request.getStreetName());
    
        user = userService.updateUser(user);
        return new UpdateInfoResponse(user);
    }
    
}
