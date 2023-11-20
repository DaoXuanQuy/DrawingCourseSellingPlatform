package vn.fpt.elearning.core.converter;

import org.mapstruct.IterableMapping;
import org.mapstruct.Named;

import java.util.List;

public interface FromEntityListToInfoList<T, E> {

    @Named("fromEntityToInfoListMapper")
    T fromEntityToInfoList(E entity);

    @Named("fromEntityListToInfoListMapper")
    @IterableMapping(qualifiedByName = "fromEntityToInfoListMapper")
    List<T> fromEntityListToInfoList(List<E> entities);
}
