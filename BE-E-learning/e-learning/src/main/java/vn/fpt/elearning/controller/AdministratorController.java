package vn.fpt.elearning.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.admin.request.*;
import vn.fpt.elearning.dtos.admin.response.CreateAdminResponse;
import vn.fpt.elearning.dtos.admin.response.GetInfoAdminResponse;
import vn.fpt.elearning.dtos.admin.response.UpdateInfoAdminResponse;
import vn.fpt.elearning.model.admin.AdministratorDto;
import vn.fpt.elearning.controller.interfaces.IAdministratorController;


@RestController
public class AdministratorController extends BaseController implements IAdministratorController {

    @Override
    public ResponseEntity<ResponseBase<CreateAdminResponse>> createAdmin(CreateAdminRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> banAdmin(BanAdminRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> unbanAdmin(UnbanAdminRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> resetPasswordAdmin(ResetPasswordAdminRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<UpdateInfoAdminResponse>> updateInfoAdmin(UpdateInfoAdminRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetInfoAdminResponse>> getInfoAdminById(String id) {
        GetInfoAdminByIdRequest request = new GetInfoAdminByIdRequest(id);
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetInfoAdminResponse>> getInfoAdmin() {
        GetInfoAdminRequest request = new GetInfoAdminRequest();
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<PageResponseData<AdministratorDto>>> getListAdministrator(GetListAdminRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }
	//controller để xử lý khi nhận được request
}
