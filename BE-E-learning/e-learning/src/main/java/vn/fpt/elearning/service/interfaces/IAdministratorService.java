package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.entity.Administrator;

public interface IAdministratorService {
    Administrator save(Administrator administrator);

    Administrator getByPhone(String phone);

    Administrator getById(String id);

    Page<Administrator> getPageAdmin(Specification<Administrator> specification, Pageable pageable);
}
