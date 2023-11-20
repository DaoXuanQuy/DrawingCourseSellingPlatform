package vn.fpt.elearning.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
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
@Validated
@RequestMapping("/")
public interface IGetDetailByIdController<T extends BaseRequestData & BaseID<?>, I extends BaseResponseData> extends IBaseController {

    @Transactional(readOnly = true)
    @GetMapping("{id}/detail")
    default ResponseEntity<ResponseBase<I>> getDetailById(@Valid T id) {
        return execute(id);
    }
}
