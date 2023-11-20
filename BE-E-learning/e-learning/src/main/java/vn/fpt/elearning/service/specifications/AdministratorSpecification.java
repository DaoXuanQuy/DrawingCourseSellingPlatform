package vn.fpt.elearning.service.specifications;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.entity.Auditable;
import vn.fpt.elearning.enums.AdminStatus;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AdministratorSpecification {

    public Specification<Administrator> likeFullName(String fullName) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(fullName)) {
                return criteriaBuilder.like(root.get(Administrator.Fields.fullName), "%" + fullName + "%");
            }
            return null;
        };
    }

    public Specification<Administrator> gteCreateDate(LocalDateTime fromDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get(Auditable.Fields.createDate), fromDate);
            }
            return null;
        };
    }

    public Specification<Administrator> lteCreateDate(LocalDateTime toDate) {
        return (root, query, criteriaBuilder) -> {
            if (toDate != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get(Auditable.Fields.createDate), toDate);
            }
            return null;
        };
    }

    public Specification<Administrator> equalStatus(AdminStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status != null) {
                return criteriaBuilder.equal(root.get(Administrator.Fields.status), status);
            }
            return null;
        };
    }
}
