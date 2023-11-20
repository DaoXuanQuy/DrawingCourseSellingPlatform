package vn.fpt.elearning.core.converter;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;
import vn.fpt.elearning.core.PageResponseData;

import java.util.List;

public interface FromEntityPageToDetailPage<T, E> {

    @Named("fromEntityToDetailFilterPageMapper")
    T fromEntityToDetailFilterPage(E entity);

    @Named("fromEntityListToDetailFilterPageListMapper")
    @IterableMapping(qualifiedByName = "fromEntityToDetailFilterPageMapper")
    List<T> fromEntityListToDetailFilterPageList(List<E> entities);

    @Named("fromEntityPageToDetailFilterPageMapper")
    @Mapping(source = "number", target = "current")
    @Mapping(source = "size", target = "pageSize")
    @Mapping(source = "totalPages", target = "totalPage")
    @Mapping(source = "totalElements", target = "total")
    @Mapping(source = "content", target = "data", qualifiedByName = "fromEntityListToDetailFilterPageListMapper")
    PageResponseData<T> fromEntityPageToDetailFilterPage(Page<E> entityPage);
}
