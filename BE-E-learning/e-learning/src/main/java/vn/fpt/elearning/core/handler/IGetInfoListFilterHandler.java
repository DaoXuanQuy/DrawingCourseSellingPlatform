package vn.fpt.elearning.core.handler;

import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.core.BaseResponseList;
import vn.fpt.elearning.core.Handler;
import vn.fpt.elearning.core.converter.FromEntityListToInfoList;

import java.util.List;

@SuppressWarnings("unchecked")
public interface IGetInfoListFilterHandler<ID, T extends BaseRequestData, U, E, M extends FromEntityListToInfoList<U, E>> extends
        IBaseFilterHandler<ID, T, E>,
        IBaseMapperHandler<M>,
        Handler<T, BaseResponseList<U>> {

    @Override
    default BaseResponseList<U> handle(T request) {
        request = preHandle(request);
        List<E> entities;
        if (request instanceof Specification) {
            entities = getSpecificationExecutor().findAll((Specification<E>) request);
        } else {
            entities = getRepository().findAll();
        }
        List<U> response = getMapper().fromEntityListToInfoList(entities);
        postMapping(entities, response);
        postHandle(entities, request);
        return new BaseResponseList<>(response);
    }

    default void postMapping(List<E> entity, List<U> response) {

    }

    default void postHandle(List<E> entity, T request) {

    }
}
