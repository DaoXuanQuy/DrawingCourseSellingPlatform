package vn.fpt.elearning.core.converter;

import vn.fpt.elearning.core.BaseRequestData;

public interface FromCreateRequestToEntity<T extends BaseRequestData, E> {

    E fromCreateRequestToEntity(T request);
}
