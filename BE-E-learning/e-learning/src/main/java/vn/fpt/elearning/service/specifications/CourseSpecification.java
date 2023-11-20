package vn.fpt.elearning.service.specifications;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Auditable;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.CourseStatus;

import javax.persistence.criteria.Join;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class CourseSpecification {
    public Specification<Course> likeCourseName(String courseName) {
        return (root, query, cb) -> {
            if (StringUtils.isNotBlank(courseName)) {
                return cb.like(root.get(Course.Fields.courseName), "%" + courseName + "%");
            }
            return null;
        };
    }

    public Specification<Course> equalCourseId(UUID courseId) {
        return (root, query, cb) -> {
            if (courseId != null) {
                return cb.equal(root.get(Course.Fields.id), courseId);
            }
            return null;
        };
    }

    public Specification<Course> likeDescription(String description) {
        return (root, query, cb) -> {
            if (StringUtils.isNotBlank(description)) {
                return cb.like(root.get(Course.Fields.description), "%" + description + "%");
            }
            return null;
        };
    }

    public Specification<Course> equalCreateAt(LocalDate createAt) {
        return (root, query, cb) -> {
            if (createAt != null) {
                return cb.equal(root.get(Auditable.Fields.createDate), createAt);
            }
            return null;
        };
    }

    public Specification<Course> gteCreateFrom(LocalDateTime createFrom) {
        return (root, query, cb) -> {
            if (createFrom != null) {
                return cb.greaterThanOrEqualTo(root.get(Auditable.Fields.createDate), createFrom);
            }
            return null;
        };
    }

    public Specification<Course> lteCreateTo(LocalDateTime createTo) {
        return (root, query, cb) -> {
            if (createTo != null) {
                return cb.lessThanOrEqualTo(root.get(Auditable.Fields.createDate), createTo);
            }
            return null;
        };
    }

    public Specification<Course> equalPrice(Double price) {
        return (root, query, cb) -> {
            if (price != null) {
                return cb.equal(root.get(Course.Fields.price), price);
            }
            return null;
        };
    }

    public Specification<Course> gtePrice(Double priceFrom) {
        return (root, query, cb) -> {
            if (priceFrom != null) {
                return cb.greaterThanOrEqualTo(root.get(Course.Fields.price), priceFrom);
            }
            return null;
        };
    }

    public Specification<Course> ltePriceTo(Double priceTo) {
        return (root, query, cb) -> {
            if (priceTo != null) {
                return cb.lessThanOrEqualTo(root.get(Course.Fields.price), priceTo);
            }
            return null;
        };
    }

    public Specification<Course> equalStatus(CourseStatus status) {
        return ((root, query, criteriaBuilder) -> {
            if (status != null) {
                return criteriaBuilder.equal(root.get(Course.Fields.status), status);
            }
            return null;
        });
    }

    public Specification<Course> equalApproveStatus(ApproveStatus status) {
        return ((root, query, criteriaBuilder) -> {
            if (status != null) {
                return criteriaBuilder.equal(root.get(Course.Fields.approveStatus), status);
            }
            return null;
        });
    }

    public Specification<Course> byUser(String userId) {
        if (StringUtils.isNotBlank(userId)) {
            return ((root, query, criteriaBuilder) -> {
                Join<Course, User> authorCourse = root.join(Course.Fields.users);
                return criteriaBuilder.equal(authorCourse.get(User.Fields.id), userId);
            });
        }
        return null;
    }

    public Specification<Course> equalCreateBy(String userId) {
        return ((root, query, criteriaBuilder) -> {
            if (StringUtils.isNotBlank(userId)) {
                return criteriaBuilder.equal(root.get(Auditable.Fields.createdBy), userId);
            }
            return null;
        });
    }
}
