package vn.fpt.elearning.service.specifications;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Invoice;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.InvoiceStatus;

import java.time.LocalDateTime;

@Component
public class InvoiceSpecification {
    public Specification<Invoice> equalCourseId(String courseId) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(courseId)) {
                return criteriaBuilder.equal(root.join(Invoice.Fields.course).get(Course.Fields.id), courseId);
            }
            return null;
        };
    }

    public Specification<Invoice> equalUserId(String userId) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(userId)) {
                return criteriaBuilder.equal(root.join(Invoice.Fields.user).get(User.Fields.id), userId);
            }
            return null;
        };
    }

    public Specification<Invoice> equalTeacherId(String teacherId) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(teacherId)) {
                return criteriaBuilder.equal(root.join(Invoice.Fields.course).join(Course.Fields.teacher).get(Teacher.Fields.id), teacherId);
            }
            return null;
        };
    }

    public Specification<Invoice> equalStatus(InvoiceStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status != null) {
                return criteriaBuilder.equal(root.get(Invoice.Fields.status), status);
            }
            return null;
        };
    }

    public Specification<Invoice> fromDate(LocalDateTime fromDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get(Invoice.Fields.time), fromDate);
            }
            return null;
        };
    }

    public Specification<Invoice> toDate(LocalDateTime toDate) {
        return (root, query, criteriaBuilder) -> {
            if (toDate != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get(Invoice.Fields.time), toDate);
            }
            return null;
        };
    }
}
