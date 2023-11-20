package vn.fpt.elearning.service.specifications;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Auditable;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.TeacherStatus;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import java.time.LocalDateTime;

@Component
public class TeacherSpecification {
    public Specification<Teacher> equalStatus(TeacherStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status != null) {
                return criteriaBuilder.equal(root.get(Teacher.Fields.status), status);
            }
            return null;
        };
    }

    public Specification<Teacher> likeUserName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(name)) {
                Join<Teacher, User> teacherUserJoin = root.join(Teacher.Fields.user, JoinType.LEFT);
                return criteriaBuilder.like(teacherUserJoin.get(User.Fields.lastName), "%" + name + "%");
            }
            return null;
        };
    }

    public Specification<Teacher> equalPhone(String phone) {
        return (root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(phone)) {
                Join<Teacher, User> teacherUserJoin = root.join(Teacher.Fields.user, JoinType.LEFT);
                return criteriaBuilder.like(teacherUserJoin.get(User.Fields.phone), "%" + phone + "%");
            }
            return null;
        };
    }

    public Specification<Teacher> gteCreateDate(LocalDateTime fromDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get(Auditable.Fields.createDate), fromDate);
            }
            return null;
        };
    }


    public Specification<Teacher> lteCreateDate(LocalDateTime toDate) {
        return (root, query, criteriaBuilder) -> {
            if (toDate != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get(Auditable.Fields.createDate), toDate);
            }
            return null;
        };
    }

    public Specification<Teacher> gteApproveDate(LocalDateTime fromDate) {
        return (root, query, criteriaBuilder) -> {
            if (fromDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get(Teacher.Fields.approveDate), fromDate);
            }
            return null;
        };
    }


    public Specification<Teacher> lteApproveDate(LocalDateTime toDate) {
        return (root, query, criteriaBuilder) -> {
            if (toDate != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get(Teacher.Fields.approveDate), toDate);
            }
            return null;
        };
    }
}
