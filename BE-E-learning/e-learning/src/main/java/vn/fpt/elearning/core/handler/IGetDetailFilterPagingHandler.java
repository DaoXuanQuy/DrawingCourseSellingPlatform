package vn.fpt.elearning.core.handler;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.core.Handler;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.converter.FromEntityPageToDetailPage;

public interface IGetDetailFilterPagingHandler<ID, T extends BaseRequestData, U, E, M extends FromEntityPageToDetailPage<U, E>> extends
        IBaseFilterHandler<ID, T, E>,
        IBaseMapperHandler<M>,
        Handler<T, PageResponseData<U>> {

    @Override
    default PageResponseData<U> handle(T request) {
        request = preHandle(request);
        Page<E> entities;
        if (request instanceof Specification) {
            entities = getSpecificationExecutor().findAll((Specification<E>) request, request.getPageable());
        } else {
            entities = getRepository().findAll(request.getPageable());
        }
        PageResponseData<U> response = getMapper().fromEntityPageToDetailFilterPage(entities);
        postMapping(entities, response);
        postHandle(entities, request);
        return response;
    }

    default void postMapping(Page<E> entityPage, PageResponseData<U> responsePage) {

    }

    default void postHandle(Page<E> entity, T request) throws UnsupportedOperationException {

    }
}
