package vn.fpt.elearning.service.specifications;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Invoice;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class BillSpecification {
    private final IUserService userService;

    public Specification<Invoice> equalUser(String userId) {
        User user = userService.getUserById(userId);
        return (root, query, criteriaBuilder) -> {
            if (user != null) {
                return criteriaBuilder.equal(root.get(Invoice.Fields.user), user);
            }
            return null;
        };
    }
}
