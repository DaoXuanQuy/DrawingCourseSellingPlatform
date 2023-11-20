package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.entity.WithdrawInvoice;

public interface IWithdrawInvoiceService {
    WithdrawInvoice save(WithdrawInvoice withdrawInvoice);
    Page<WithdrawInvoice> getAll(Specification<WithdrawInvoice> spec, Pageable pageable);
}
