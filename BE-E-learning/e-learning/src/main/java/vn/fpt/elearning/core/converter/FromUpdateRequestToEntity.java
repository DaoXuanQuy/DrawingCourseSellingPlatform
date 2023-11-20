package vn.fpt.elearning.core.converter;

import org.mapstruct.MappingTarget;
import vn.fpt.elearning.core.BaseRequestData;

public interface FromUpdateRequestToEntity<T extends BaseRequestData, E> {
    void fromUpdateRequestToEntity(T request, @MappingTarget E entity);
}
