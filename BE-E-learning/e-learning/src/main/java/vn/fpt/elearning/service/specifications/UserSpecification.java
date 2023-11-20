package vn.fpt.elearning.service.specifications;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Auditable;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.Gender;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class UserSpecification {
    public Specification<User> likeFirstName(String firstName) {
        return (root, query, criteriaBuilder) -> {
            if (firstName != null) {
                return criteriaBuilder.like(root.get(User.Fields.firstName), "%" + firstName + "%");
            }
            return null;
        };
    }

    public Specification<User> likeLastName(String lastName) {
        return (root, query, criteriaBuilder) -> {
            if (lastName != null) {
                return criteriaBuilder.like(root.get(User.Fields.lastName), "%" + lastName + "%");
            }
            return null;
        };
    }

    public Specification<User> likeEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email != null) {
                return criteriaBuilder.like(root.get(User.Fields.email), "%" + email + "%");
            }
            return null;
        };
    }

    public Specification<User> likeStreetName(String streetName) {
        return (root, query, criteriaBuilder) -> {
            if (streetName != null) {
                return criteriaBuilder.like(root.get(User.Fields.streetName), "%" + streetName + "%");
            }
            return null;
        };
    }

    public Specification<User> likeWards(String wards) {
        return (root, query, criteriaBuilder) -> {
//            if (wards != null) {
//                return criteriaBuilder.like(root.get(User.Fields.wards), "%" + wards + "%");
//            }
            return null;
        };
    }

    public Specification<User> likeDistrict(String district) {
        return (root, query, criteriaBuilder) -> {
//            if (district != null) {
//                return criteriaBuilder.like(root.get(User.Fields.district), "%" + district + "%");
//            }
            return null;
        };
    }

    public Specification<User> likeCity(String city) {
        return (root, query, criteriaBuilder) -> {
//            if (city != null) {
//                return criteriaBuilder.like(root.get(User.Fields.city), "%" + city + "%");
//            }
            return null;
        };
    }


    public Specification<User> equalGender(Gender gender) {
        return (root, query, criteriaBuilder) -> {
            if (gender != null) {
                return criteriaBuilder.equal(root.get(User.Fields.gender), gender);
            }
            return null;
        };
    }

    public Specification<User> equalPhone(String phone) {
        return (root, query, criteriaBuilder) -> {
            if (phone != null) {
                return criteriaBuilder.equal(root.get(User.Fields.phone), phone);
            }
            return null;
        };
    }

    public Specification<User> equalBirthday(LocalDate birthday) {
        return (root, query, criteriaBuilder) -> {
            if (birthday != null) {
                return criteriaBuilder.equal(root.get(User.Fields.birthday), birthday);
            }
            return null;
        };
    }

    public Specification<User> equalHomeNumber(Integer homeNumber) {
        return (root, query, criteriaBuilder) -> {
            if (homeNumber != null) {
                return criteriaBuilder.equal(root.get(User.Fields.homeNumber), homeNumber);
            }
            return null;
        };
    }

    public Specification<User> createFrom(LocalDateTime createFrom) {
        return (root, query, criteriaBuilder) -> {
            if (createFrom != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get(Auditable.Fields.createDate), createFrom);
            }
            return null;
        };
    }

    public Specification<User> createTo(LocalDateTime createTo) {
        return (root, query, criteriaBuilder) -> {
            if (createTo != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get(Auditable.Fields.createDate), createTo);
            }
            return null;
        };
    }

    public Specification<User> equalActive(Boolean active) {
        return (root, query, criteriaBuilder) -> {
            if (active != null) {
                return criteriaBuilder.equal(root.get(User.Fields.active), active);
            }
            return null;
        };
    }

    public Specification<User> equalDelete(Boolean delete) {
        return (root, query, criteriaBuilder) -> {
            if (delete != null) {
                return criteriaBuilder.equal(root.get(User.Fields.delete), delete);
            }
            return null;
        };
    }

    public Specification<User> equalBan(Boolean ban) {
        return (root, query, criteriaBuilder) -> {
            if (ban != null) {
                return criteriaBuilder.equal(root.get(User.Fields.ban), ban);
            }
            return null;
        };
    }

    public Specification<User> equalIsOcr(Boolean isOcr) {
        return (root, query, criteriaBuilder) -> {
            if (isOcr != null) {
                return criteriaBuilder.equal(root.get(User.Fields.isOrc), isOcr);
            }
            return null;
        };
    }

    public Specification<User> isTeacher(Boolean isTeacher) {
        return (root, query, criteriaBuilder) -> {
            if (Boolean.TRUE.equals(isTeacher)) {
                return criteriaBuilder.isNotNull(root.get(User.Fields.teacher));
            } else if (Boolean.FALSE.equals(isTeacher)) {
                return criteriaBuilder.isNull(root.get(User.Fields.teacher));
            }
            return null;
        };
    }

}
