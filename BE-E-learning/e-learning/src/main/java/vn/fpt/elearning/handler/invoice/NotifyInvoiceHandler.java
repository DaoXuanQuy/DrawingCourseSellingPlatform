package vn.fpt.elearning.handler.invoice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.invoice.request.NotifyKLBPayRequest;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Invoice;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.InvoiceStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IInvoiceService;
import vn.fpt.elearning.service.interfaces.ITeacherService;
import vn.fpt.elearning.service.interfaces.IUserService;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class NotifyInvoiceHandler extends RequestHandler<NotifyKLBPayRequest, StatusResponse> {
    private final IInvoiceService invoiceService;
    private final ICourseService courseService;
    private final IUserService userService;
    private final ITeacherService teacherService;
    @Override
    @Transactional
    public StatusResponse handle(NotifyKLBPayRequest request) {
        Invoice invoice = invoiceService.getByCode(request.getRefTransactionId());
        if (InvoiceStatus.SUCCESS.equals(invoice.getStatus())) {
            throw new InternalException(ResponseCode.INVOICE_NOT_FOUND);
        }
        if (request.isSuccess()) {
            invoice.setStatus(InvoiceStatus.SUCCESS);
            invoice.setTime(getTime(request.getTime()));
        } else {
            invoice.setStatus(InvoiceStatus.CANCELED);
            invoice.setTime(getTime(request.getTime()));
        }

        invoice = invoiceService.save(invoice);
        if (InvoiceStatus.SUCCESS.equals(invoice.getStatus())) {
            Course course = invoice.getCourse();
            User user = invoice.getUser();
            course.getUsers().add(user);
            user.getCourses().add(course);
            Teacher teacher = course.getTeacher();
            if (teacher == null) {
                throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
            }
            teacher.setBalance(teacher.getBalance() + invoice.getAmount());
            teacherService.save(teacher);
            courseService.updateCourse(course);
            userService.updateUser(user);
        }
        return new StatusResponse(true);
    }
    private LocalDateTime getTime(String time) {
        try {
            return LocalDateTime.parse(time);
        } catch (RuntimeException e) {
            return LocalDateTime.now();
        }
    }
}
