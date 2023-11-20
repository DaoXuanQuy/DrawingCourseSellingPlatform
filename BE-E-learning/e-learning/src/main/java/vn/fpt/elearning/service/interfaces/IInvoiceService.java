package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.entity.Invoice;

public interface IInvoiceService {
    Invoice getById(String id);
    Invoice save(Invoice invoice);
    Invoice getByCode(String code);
    Boolean existsByCode(String code);
    Invoice getByUserAndCourse(String userId, String courseId);
    Invoice findByUserAndCourse(String userId, String courseId);
    Page<Invoice> getAll(Specification<Invoice> spec, Pageable pageable);
}
