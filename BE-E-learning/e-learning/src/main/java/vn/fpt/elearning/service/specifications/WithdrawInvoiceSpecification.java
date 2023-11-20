package vn.fpt.elearning.service.specifications;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.entity.WithdrawInvoice;
import vn.fpt.elearning.enums.FTStatus;

import java.time.LocalDateTime;

@Component
public class WithdrawInvoiceSpecification {
    public Specification<WithdrawInvoice> equalTeacherId(String teacherId) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(teacherId)) {
                return criteriaBuilder.equal(root.join(WithdrawInvoice.Fields.teacher).get(Teacher.Fields.id), teacherId);
            }
            return null;
        };
    }

    public Specification<WithdrawInvoice> equalStatus(FTStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status != null) {
                return criteriaBuilder.equal(root.get(WithdrawInvoice.Fields.status), status);
            }
            return null;
        };
    }

    public Specification<WithdrawInvoice> likeTxnNumber(String txnNumber) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(txnNumber)) {
                return criteriaBuilder.equal(root.get(WithdrawInvoice.Fields.txnNumber), txnNumber);
            }
            return null;
        };
    }

    public Specification<WithdrawInvoice> fromDate(LocalDateTime fromDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get(WithdrawInvoice.Fields.time), fromDate);
            }
            return null;
        };
    }

    public Specification<WithdrawInvoice> toDate(LocalDateTime toDate) {
        return (root, query, criteriaBuilder) -> {
            if (toDate != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get(WithdrawInvoice.Fields.time), toDate);
            }
            return null;
        };
    }
}
