package vn.fpt.elearning.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.user.request.*;
import vn.fpt.elearning.dtos.user.response.*;
import vn.fpt.elearning.model.UserResponse;
import vn.fpt.elearning.controller.interfaces.IUserController;


import java.security.Principal;

@RestController
public class UserController extends BaseController implements IUserController {
    @Override
    public ResponseEntity<ResponseBase<CmsGetAllUserResponse>> getALl(CmsGetAllUserRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }


    @Override
    public ResponseEntity<ResponseBase<CmsBanUserResponse>> banUser(String id) {
        return this.execute(new CmsBanUserRequest(id));
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> unbanUser(String id) {
        return this.execute(new CmsUnbanUserRequest(id));
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteUser(String id) {
        return this.execute(new CmsDeleteUserRequest(id));
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteUserV2(String id) {
        return this.execute(new CmsDeleteUserV2Request(id));
    }

    @Override
    public ResponseEntity<ResponseBase<GetInfoResponse>> getInfoById(String id) {
        return this.execute(new CmsGetInfoByIdRequest(id));
    }

    @Override
    public ResponseEntity<ResponseBase<UpdateInfoResponse>> updateInfoById(String id, CmsUpdateInfoByIdRequest request) {
        request.setId(id);
        return this.execute(request, UpdateInfoResponse.class);
    }
    @Override
    public ResponseEntity<ResponseBase<ChangePasswordResponse>> changePassword(Principal principal, ChangePasswordRequest request) {
        request.setUserId(principal.getName());
        return this.execute(request, ChangePasswordResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<UserResponse>> getInfo(Principal principal) {
        GetInfoRequest request = new GetInfoRequest();
        request.setUserId(principal.getName());
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetUsersResponse>> getUsers(GetUsersRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request, GetUsersResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<UserResponse>> updateInfo(Principal principal, UpdateInfoRequest request) {
        request.setUserId(principal.getName());
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetEkycInfoResponse>> getEkycInfo() {
        return this.execute(new GetEkycInfoRequest(), GetEkycInfoResponse.class);
    }
}
