package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.fpt.elearning.entity.Province;

public interface ProvinceRepository extends JpaRepository<Province, Long>, JpaSpecificationExecutor<Province> {
}
