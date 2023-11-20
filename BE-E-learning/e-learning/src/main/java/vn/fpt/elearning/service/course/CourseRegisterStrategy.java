package vn.fpt.elearning.service.course;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;
import vn.fpt.elearning.dtos.invoice.request.AbstractNotifyPaymentRequest;
import vn.fpt.elearning.enums.PaymentType;

public interface CourseRegisterStrategy {

    PaymentType getPaymentType();

    @Transactional
    String create(@NonNull String courseId, String userId);

    @Transactional
    boolean confirm(@NonNull AbstractNotifyPaymentRequest request, String userId);
}
