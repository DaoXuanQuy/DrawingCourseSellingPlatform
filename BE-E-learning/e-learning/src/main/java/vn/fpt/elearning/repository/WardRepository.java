package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.fpt.elearning.entity.Ward;

import java.util.List;

public interface WardRepository extends JpaRepository<Ward, Long>, JpaSpecificationExecutor<Ward> {
    List<Ward> findAllByDistrictId(Long districtId);
}
