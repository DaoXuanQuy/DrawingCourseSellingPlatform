package vn.fpt.elearning.core.converter;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;
import vn.fpt.elearning.core.PageResponseData;

import java.util.List;

public interface FromEntityPageToInfoPage<T, E> {

    @Named("fromEntityToInfoFilterPageMapper")
    T fromEntityToInfoFilterPage(E entity);

    @Named("fromEntityListToInfoFilterPageListMapper")
    @IterableMapping(qualifiedByName = "fromEntityToInfoFilterPageMapper")
    List<T> fromEntityListToInfoFilterPageList(List<E> entities);

    @Named("fromEntityPageToInfoFilterPageMapper")
    @Mapping(source = "number", target = "current")
    @Mapping(source = "size", target = "pageSize")
    @Mapping(source = "totalPages", target = "totalPage")
    @Mapping(source = "totalElements", target = "total")
    @Mapping(source = "content", target = "data", qualifiedByName = "fromEntityListToInfoFilterPageListMapper")
    PageResponseData<T> fromEntityPageToInfoFilterPage(Page<E> entityPage);
}
