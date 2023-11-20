package vn.fpt.elearning.core.handler;

import vn.fpt.elearning.core.BaseID;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.core.Handler;
import vn.fpt.elearning.core.converter.FromUpdateRequestToEntity;
import vn.fpt.elearning.dtos.StatusResponse;

public interface IUpdateModelHandler<ID, T extends BaseRequestData & BaseID<?>, E, M extends FromUpdateRequestToEntity<T, E>> extends
        IBaseHandler<ID, T, E>,
        IBaseMapperHandler<M>,
        Handler<T, StatusResponse> {

    @Override
    default StatusResponse handle(T request) {
        request = preHandle(request);
        E entity = getRepository().findById(request.convertedId())
                .orElseThrow(this::notFound);
        validate(entity, request);
        getMapper().fromUpdateRequestToEntity(request, entity);
        postMapping(entity, request);
        entity = getRepository().save(entity);
        postHandle(entity, request);
        return new StatusResponse(true);
    }

    default void validate(E entity, T request) {

    }

    default void postMapping(E entity, T request) {

    }

    default void postHandle(E entity, T request) {

    }
}
