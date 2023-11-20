package vn.fpt.elearning.core.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.BaseID;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.core.ResponseBase;

import javax.validation.Valid;

/**
 * @param <T> request model {@link BaseRequestData}
 * @param <I> response {@link BaseResponseData}
 */
@RequestMapping("/")
public interface IUpdateModelController<T extends BaseRequestData & BaseID<?>, I extends BaseResponseData> extends IBaseController {

    @Transactional
    @PutMapping(value = "update", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    default ResponseEntity<ResponseBase<I>> updateModel(@RequestBody @Valid T request) {
        return execute(request);
    }
}
