package vn.fpt.elearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.address.request.*;
import vn.fpt.elearning.dtos.address.response.*;
import vn.fpt.elearning.controller.interfaces.IAddressController;


@RestController
public class AddressController extends BaseController implements IAddressController {

    @Override
    public ResponseEntity<ResponseBase<ShowAllResponse>> showAllDivisions() {
        return this.execute(new ShowAllRequest(), ShowAllResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetAllProvincesResponse>> getAllProvinces() {
        return this.execute(new GetAllProvincesRequest(), GetAllProvincesResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetDistrictsByProvinceResponse>> getDistrictsByProvince(GetDistrictsByProvinceRequest request) {
        return this.execute(request, GetDistrictsByProvinceResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetWardsbyDistrictResponse>> getWardsByProvince(GetWardsByDistrictRequest request) {
        return this.execute(request, GetWardsbyDistrictResponse.class);
    }


    @Override
    public ResponseEntity<ResponseBase<GetAllProvinceV2Response>> getAllProvincesV2() {
        return this.execute(new GetAllProvinceV2Request());
    }

    @Override
    public ResponseEntity<ResponseBase<GetDistrictsByProvinceV2Response>> getDistrictsByProvinceV2(GetDistrictsByProvinceV2Request request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetWardsByDistrictV2Response>> getWardsByDistrictV2(GetWardsByDistrictV2Request request) {
        return this.execute(request);
    }
}
