package vn.fpt.elearning.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.core.ResponseBase;

import javax.validation.Valid;

/**
 * @param <T> request model {@link BaseRequestData}
 * @param <I> response {@link BaseResponseData}
 */

@RequestMapping("/")
public interface ICreateModelController<T extends BaseRequestData, I extends BaseResponseData> extends IBaseController {

    @Transactional
    @PostMapping("create")
    default ResponseEntity<ResponseBase<I>> createModel(@RequestBody @Valid T request) {
        return execute(request);
    }
}
