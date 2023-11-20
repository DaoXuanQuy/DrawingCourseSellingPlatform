package vn.fpt.elearning.service.course;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.client.vnpay.VNPayPaymentQueryCreator;
import vn.fpt.elearning.dtos.invoice.request.AbstractNotifyPaymentRequest;
import vn.fpt.elearning.dtos.invoice.request.NotifyVNPayRequest;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Invoice;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.InvoiceStatus;
import vn.fpt.elearning.enums.PaymentType;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.utils.CommonUtils;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IInvoiceService;
import vn.fpt.elearning.service.interfaces.ITeacherService;
import vn.fpt.elearning.service.interfaces.IUserService;

import java.time.Duration;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class VNPayCourseRegisterStrategy implements CourseRegisterStrategy {

    @Lazy
    private final ICourseService courseService;
    private final IUserService userService;
    private final IInvoiceService invoiceService;
    private final ITeacherService teacherService;
    @Value("${server.host}")
    private String ipnUrl;
    @Value("${url.vnpay-success-url-form}")
    private String redirectUrlPattern;
    @Value("${vnpay.url}")
    private String vnpayUrl;
    @Value("${vnpay.terminal-code}")
    private String terminalCode;
    @Value("${vnpay.secret}")
    private String vnpaySecret;
    @Value("${fee-service}")
    private long feeService;

    @Override
    public PaymentType getPaymentType() {
        return PaymentType.VNPAY;
    }

    @Override
    public String create(@NonNull String courseId, String userId) {
        Course course = courseService.getCourseByIdNotNull(courseId);
        User user = userService.getUserByIdNotNull(userId);
        Invoice invoice = invoiceService.findByUserAndCourse(user.getId(), course.getId());
        if (invoice != null && InvoiceStatus.SUCCESS.equals(invoice.getStatus())) {
            throw new InternalException(ResponseCode.COURSE_IS_REGISTERED);
        }
        String code;
        do {
            code = CommonUtils.getRandomString(16, false);
        } while (!Boolean.FALSE.equals(invoiceService.existsByCode(code)));
        VNPayPaymentQueryCreator creator = VNPayPaymentQueryCreator.builder()
                .amount(course.getPrice())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .orderInfo("Dang ky khoa hoc tren E Learning")
                .phone(user.getPhone())
                .returnUrl(String.format(redirectUrlPattern, course.getId()))
                .terminalCode(terminalCode)
                .txnRef(code)
                .secret(vnpaySecret)
                .build();
        long amount = course.getPrice() * (100 - course.getDiscountPercentage()) / 100;
        if (invoice != null) {
            invoice.setCode(code)
                    .setTimeout(Duration.ofMinutes(15).toMillis())
                    .setAmount(amount)
                    .setUrl(creator.getPaymentUrl(vnpayUrl))
                    .setDescription(course.getDescription())
                    .setTime(LocalDateTime.now())
                    .setStatus(InvoiceStatus.CREATED);
        } else {
            invoice = new Invoice()
                    .setUser(user)
                    .setCourse(course)
                    .setCode(code)
                    .setTimeout(Duration.ofMinutes(15).toMillis())
                    .setAmount(amount)
                    .setUrl(creator.getPaymentUrl(vnpayUrl))
                    .setDescription(course.getDescription())
                    .setTime(LocalDateTime.now())
                    .setStatus(InvoiceStatus.CREATED);
        }
        if (amount <= 0) {
            invoice.setStatus(InvoiceStatus.SUCCESS);
            invoice.setTime(LocalDateTime.now());
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

        invoiceService.save(invoice);
        return InvoiceStatus.CREATED.equals(invoice.getStatus()) ? creator.getPaymentUrl(vnpayUrl) : "success";
    }

    @Override
    public boolean confirm(@NonNull AbstractNotifyPaymentRequest request, String userId) {
        NotifyVNPayRequest vnPayRequest = request.unwrap(NotifyVNPayRequest.class);
        if (!vnPayRequest.validate(vnpaySecret)) {
            throw new InternalException(ResponseCode.TRANSACTION_FAILED);
        }
        Invoice invoice = invoiceService.getByCode(vnPayRequest.getRefTransactionId());
        if (InvoiceStatus.SUCCESS.equals(invoice.getStatus())) {
            throw new InternalException(ResponseCode.INVOICE_NOT_FOUND);
        }
        if ("00".equals(vnPayRequest.getResponseCode())) {
            invoice.setStatus(InvoiceStatus.SUCCESS);
        } else {
            invoice.setStatus(InvoiceStatus.CANCELED);
        }
        invoice.setTime(vnPayRequest.getPayDate());
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
            long balance = teacher.getBalance() + invoice.getAmount() * (1 - feeService / 100);
            teacher.setBalance(balance);
            teacherService.save(teacher);
            courseService.updateCourse(course);
            userService.updateUser(user);
        }
        return true;
    }
}
