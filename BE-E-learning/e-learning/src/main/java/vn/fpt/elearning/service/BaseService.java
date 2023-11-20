package vn.fpt.elearning.service;

import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;

import java.util.List;

public abstract class BaseService<ID, E, R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> {

    protected final R repository;

    protected BaseService(R repository) {
        this.repository = repository;
    }

    public boolean existsById(ID id) {
        return repository.existsById(id);
    }

    public E save(@NonNull E domain) {
        return repository.save(domain);
    }

    public List<E> saveAll(Iterable<E> domains) {
        return repository.saveAll(domains);
    }

    public List<E> findAll() {
        return repository.findAll();
    }

    public E findByIdNonNull(@NonNull ID id) {
        return repository.findById(id)
                .orElseThrow(() -> new InternalException(notFound()));
    }

    public E findById(ID id) {
        return repository.findById(id).orElse(null);
    }

    public List<E> findAllById(Iterable<ID> ids) {
        return repository.findAllById(ids);
    }

    public List<E> getWithFilter(Specification<E> specification) {
        return repository.findAll(specification);
    }

    public List<E> getWithFilterSort(Specification<E> specification, Sort sort) {
        return repository.findAll(specification, sort);
    }

    public Page<E> getWithFilter(Specification<E> specification, Pageable pageable) {
        return repository.findAll(specification, pageable);
    }

    public void deleteById(@NonNull ID id) {
        repository.deleteById(id);
    }

    public void delete(@NonNull E domain) {
        repository.delete(domain);
    }

    public void deleteAllById(Iterable<ID> ids) {
        repository.deleteAllById(ids);
    }

    protected boolean notBlank(String data) {
        return StringUtils.isNotBlank(data);
    }

    protected ResponseCode notFound() {
        return ResponseCode.NOT_FOUND;
    }

    protected ResponseCode invalid() {
        return ResponseCode.INVALID_PARAM;
    }

}