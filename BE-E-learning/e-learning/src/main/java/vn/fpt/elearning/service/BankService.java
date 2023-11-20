package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Bank;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.BankRepository;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IBankService;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BankService implements IBankService {
    private final BankRepository bankRepository;

    public Bank getById(Long id) {
        return bankRepository
            .findById(id)
            .orElse(null);
    }

    public Bank getByNapasCode(String code) {
        return bankRepository
            .findFirstByNapasCode(code)
            .orElseThrow(() -> new InternalException(ResponseCode.CORE_BANK_SECURITY_VIOLATION));
    }

    public Bank getByCode(String code) {
        return bankRepository
            .findFirstByCode(code)
            .orElse(null);
    }

    public boolean existByName(String name) {
        return StringUtils.isNotBlank(name)
            && bankRepository
            .findFirstByName(name)
            .isPresent();
    }

    public boolean existByShortName(String name) {
        return StringUtils.isNotBlank(name)
            && bankRepository
            .findFirstByShortName(name)
            .isPresent();
    }

    public boolean existByCommonName(String name) {
        return StringUtils.isNotBlank(name)
            && bankRepository
            .findFirstByCommonName(name)
            .isPresent();
    }

    public boolean existByNapasCode(String code) {
        return StringUtils.isNotBlank(code)
            && bankRepository
            .findFirstByNapasCode(code)
            .isPresent();
    }

    public boolean existByCitad(String code) {
        return StringUtils.isNotBlank(code)
            && bankRepository
            .findFirstByCitad(code)
            .isPresent();
    }

    public boolean existByBenId(String code) {
        return StringUtils.isNotBlank(code)
            && bankRepository
            .findFirstByBenId(code)
            .isPresent();
    }


    public boolean existBySwift(String code) {
        return StringUtils.isNotBlank(code)
            && bankRepository
            .findFirstBySwift(code)
            .isPresent();
    }

    public Bank save(Bank bank) {
        return bankRepository.save(bank);
    }

    public Bank delete(Bank bank) {
        if (bank == null) {
            return null;
        }
        bankRepository.delete(bank);
        return bank;
    }

    public Page<Bank> getAll(Specification<Bank> specification, Pageable pageable) {
        if (pageable == null) {
            return new PageImpl<>(new ArrayList<>());
        }

        return bankRepository.findAll(specification, pageable);

    }

    public List<Bank> getAll(Specification<Bank> specification) {
        return bankRepository.findAll(specification);
    }
}
