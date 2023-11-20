package vn.fpt.elearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.ekyc.request.DetectIdCardRequest;
import vn.fpt.elearning.dtos.ekyc.request.UpdateEkycRequest;
import vn.fpt.elearning.dtos.ekyc.response.DetectIdCardResponse;
import vn.fpt.elearning.dtos.ekyc.response.UpdateEkycResponse;
import vn.fpt.elearning.controller.interfaces.IEkycController;

@RestController
public class EkycController extends BaseController implements IEkycController {
    @Override
    public ResponseEntity<ResponseBase<DetectIdCardResponse>> detectIdCard(DetectIdCardRequest request) {
        return this.execute(request, DetectIdCardResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<UpdateEkycResponse>> updateEkyc(UpdateEkycRequest request) {
        return this.execute(request);
    }
}
