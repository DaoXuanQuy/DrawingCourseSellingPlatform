package vn.fpt.elearning.core.controller;

import org.springframework.http.ResponseEntity;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.core.ResponseBase;

public interface IBaseController {

    <T extends BaseRequestData, I extends BaseResponseData> ResponseEntity<ResponseBase<I>> execute(T request);
}
