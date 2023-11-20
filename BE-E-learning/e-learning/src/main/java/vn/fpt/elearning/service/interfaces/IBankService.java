package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.entity.Bank;

import java.util.List;

public interface IBankService {
    Bank getById(Long id);
    Bank getByNapasCode(String code);
    Bank getByCode(String code);
    boolean existByName(String name);
    boolean existByShortName(String name);
    boolean existByCommonName(String name);
    boolean existByNapasCode(String code);
    boolean existByCitad(String code);
    boolean existByBenId(String code);
    boolean existBySwift(String code);
    Bank save(Bank bank);
    Bank delete(Bank bank);
    Page<Bank> getAll(Specification<Bank> specification, Pageable pageable);
    List<Bank> getAll(Specification<Bank> specification);
}
