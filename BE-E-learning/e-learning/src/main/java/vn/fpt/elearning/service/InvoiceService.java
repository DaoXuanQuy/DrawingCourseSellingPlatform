package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Invoice;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.repository.InvoiceRepository;
import vn.fpt.elearning.service.interfaces.IInvoiceService;

@Service
@RequiredArgsConstructor
public class InvoiceService implements IInvoiceService {
    private final InvoiceRepository invoiceRepository;

    @Override
    public Invoice getById(String id) {
        return invoiceRepository.findById(id)
            .orElseThrow(() -> new InternalException(ResponseCode.INVOICE_NOT_FOUND));
    }

    @Override
    public Invoice save(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @Override
    public Invoice getByCode(String code) {
        return invoiceRepository.findByCode(code)
            .orElseThrow(() -> new InternalException(ResponseCode.INVOICE_NOT_FOUND));
    }

    @Override
    public Boolean existsByCode(String code) {
        return invoiceRepository.existsByCode(code);
    }
    @Override
    public Invoice getByUserAndCourse(String userId, String courseId) {
        return invoiceRepository.findFirstByUserIdAndCourseId(userId, courseId)
            .orElseThrow(() -> new InternalException(ResponseCode.INVOICE_NOT_FOUND));
    }

    @Override
    public Invoice findByUserAndCourse(String userId, String courseId) {
        return invoiceRepository.findFirstByUserIdAndCourseId(userId, courseId).orElse(null);
    }

    @Override
    public Page<Invoice> getAll(Specification<Invoice> spec, Pageable pageable) {
        return invoiceRepository.findAll(spec, pageable);
    }
}
