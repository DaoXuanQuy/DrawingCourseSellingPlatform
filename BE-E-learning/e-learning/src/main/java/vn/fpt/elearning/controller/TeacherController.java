package vn.fpt.elearning.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.teacher.request.*;
import vn.fpt.elearning.dtos.teacher.response.CreateRequestRoleTeacherResponse;
import vn.fpt.elearning.dtos.teacher.response.GetInfoTeacherResponse;
import vn.fpt.elearning.dtos.teacher.response.TeacherGetBalanceResponse;
import vn.fpt.elearning.dtos.teacher.response.WithdrawResponse;
import vn.fpt.elearning.model.teacher.TeacherDto;
import vn.fpt.elearning.controller.interfaces.ITeacherController;
import vn.fpt.elearning.dtos.teacher.request.WithDrawRequest;


@RestController
public class TeacherController extends BaseController implements ITeacherController {

    @Override
    public ResponseEntity<ResponseBase<CreateRequestRoleTeacherResponse>> createRequestRoleTeacher(CreateRequestRoleTeacherRequest request) {
        return this.execute(request, CreateRequestRoleTeacherResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> approveRequestRoleTeacher(ApproveRequestRoleTeacherRequest request) {
        return this.execute(request, StatusResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetInfoTeacherResponse>> getDetail(GetDetailTeacherByIdRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> rejectRequestRoleTeacher(RejectRequestRoleTeacherRequest request) {
        return this.execute(request, StatusResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<PageResponseData<TeacherDto>>> getListRequestRoleTeacher(GetListTeacherRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetInfoTeacherResponse>> getInfo() {
        return this.execute(new GetInfoTeacherRequest(), GetInfoTeacherResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetInfoTeacherResponse>> getTeacherInfo() {
        return this.execute(new GetInfoTeacherPortalRequest());
    }

    @Override
    public ResponseEntity<ResponseBase<WithdrawResponse>> withDraw(WithDrawRequest request) {
        return this.execute(request, WithdrawResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<TeacherGetBalanceResponse>> getBalance() {
        return this.execute(new TeacherGetBalanceRequest(), TeacherGetBalanceResponse.class);
    }

}
