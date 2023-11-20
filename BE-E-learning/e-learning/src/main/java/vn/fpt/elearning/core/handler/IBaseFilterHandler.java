package vn.fpt.elearning.core.handler;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.fpt.elearning.core.BaseRequestData;

@SuppressWarnings("unchecked")
public interface IBaseFilterHandler<ID, T extends BaseRequestData, E> extends IBaseHandler<ID, T, E> {

    default JpaSpecificationExecutor<E> getSpecificationExecutor() {
        Object repository = getRepository();
        if (repository instanceof JpaSpecificationExecutor) {
            return (JpaSpecificationExecutor<E>) repository;
        }
        throw new ClassCastException("Class " + repository.getClass() + " is not implements JpaSpecificationExecutor");
    }
}