package vn.fpt.elearning.core.converter;

import org.mapstruct.Named;
import vn.fpt.elearning.core.BaseResponseData;

public interface FromEntityToInfo<T extends BaseResponseData, E> {

    @Named("fromEntityToInfoMapper")
    T fromEntityToInfo(E entity);
}
