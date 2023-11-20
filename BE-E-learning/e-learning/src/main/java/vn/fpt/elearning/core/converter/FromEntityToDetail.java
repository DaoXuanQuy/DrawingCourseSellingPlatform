package vn.fpt.elearning.core.converter;

import vn.fpt.elearning.core.BaseResponseData;

public interface FromEntityToDetail<T extends BaseResponseData, E> {

    T fromEntityToDetail(E entity);
}
