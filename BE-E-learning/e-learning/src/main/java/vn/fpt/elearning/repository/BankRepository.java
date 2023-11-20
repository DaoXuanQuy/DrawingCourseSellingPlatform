package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.fpt.elearning.entity.Bank;

import java.util.Optional;

public interface BankRepository extends JpaRepository<Bank, Long>, JpaSpecificationExecutor<Bank> {
    Optional<Bank> findFirstByName(String keyword);

    Optional<Bank> findFirstByShortName(String keyword);

    Optional<Bank> findFirstByCommonName(String keyword);

    Optional<Bank> findFirstByCitad(String keyword);

    Optional<Bank> findFirstByNapasCode(String keyword);

    Optional<Bank> findFirstByBenId(String keyword);

    Optional<Bank> findFirstBySwift(String keyword);

    Optional<Bank> findFirstByCode(String code);
}
