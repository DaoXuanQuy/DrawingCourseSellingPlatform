//package vn.hcmute.elearning.service.course;
//
//import lombok.NonNull;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.commons.lang3.ObjectUtils;
//import org.apache.commons.lang3.StringUtils;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.stereotype.Component;
//import request.invoice.dtos.vn.fpt.elearning.AbstractNotifyPaymentRequest;
//import entity.vn.fpt.elearning.Course;
//import entity.vn.fpt.elearning.Invoice;
//import entity.vn.fpt.elearning.Teacher;
//import entity.vn.fpt.elearning.User;
//import enums.vn.fpt.elearning.InvoiceStatus;
//import enums.vn.fpt.elearning.PaymentType;
//import enums.vn.fpt.elearning.ResponseCode;
//import exception.vn.fpt.elearning.InternalException;
//import interfaces.service.vn.fpt.elearning.ICourseService;
//import interfaces.service.vn.fpt.elearning.IInvoiceService;
//import interfaces.service.vn.fpt.elearning.ITeacherService;
//import interfaces.service.vn.fpt.elearning.IUserService;
//import utils.vn.fpt.elearning.CommonUtils;
//import vn.unicloud.sdk.payment.KPayClient;
//import vn.unicloud.sdk.payment.transaction.model.CustomerInfo;
//import vn.unicloud.sdk.payment.transaction.request.CancelTransactionRequest;
//import vn.unicloud.sdk.payment.transaction.request.CreateTransactionRequest;
//import vn.unicloud.sdk.payment.transaction.response.CreateTransactionResponse;
//
//import java.time.LocalDateTime;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class KLBPayCourseRegisterStrategy implements CourseRegisterStrategy {
//
//    @Lazy
//    private final ICourseService courseService;
//    private final IUserService userService;
//    private final KPayClient kPayClient;
//    private final IInvoiceService invoiceService;
//    private final ITeacherService teacherService;
//    @Value("${url.success-url-form}")
//    private String successUrlForm;
//    @Value("${url.fail-url-form}")
//    private String failUrlForm;
//    @Value("${fee-service}")
//    private long feeService;
//
//    @Override
//    public PaymentType getPaymentType() {
//        return PaymentType.UMEE_PAY;
//    }
//
//    @Override
//    public String create(@NonNull String courseId, String userId) {
//        Course course = courseService.getCourseById(courseId);
//        if (course == null) {
//            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
//        }
//        User user = userService.getUserById(userId);
//        if (user == null) {
//            throw new InternalException(ResponseCode.USER_NOT_FOUND);
//        }
//        if (course.getUsers().contains(user)) {
//            throw new InternalException(ResponseCode.COURSE_IS_REGISTERED);
//        }
//        Invoice invoice = invoiceService.findByUserAndCourse(user.getId(), course.getId());
//        if (invoice != null && InvoiceStatus.SUCCESS.equals(invoice.getStatus())) {
//            throw new InternalException(ResponseCode.COURSE_IS_REGISTERED);
//        }
//        Teacher teacher = course.getTeacher();
//        if (teacher == null || !ObjectUtils.notEqual(teacher, user.getTeacher())) {
//            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
//        }
//        String code;
//        do {
//            code = CommonUtils.getRandomString(16, false);
//        } while (!Boolean.FALSE.equals(invoiceService.existsByCode(code)));
//        long amount = course.getPrice() * (100 - course.getDiscountPercentage()) / 100;
//        CreateTransactionRequest payRequest = new CreateTransactionRequest();
//        payRequest.setAmount(amount);
//        payRequest.setCustomerInfo(new CustomerInfo(String.format("%s %s", user.getFirstName(), user.getLastName()), user.getPhone(), user.getEmail(), ""));
//        payRequest.setFailUrl(failUrlForm);
//        payRequest.setSuccessUrl(String.format("%s/%s", successUrlForm, courseId));
//        payRequest.setRefTransactionId(code);
//        payRequest.setTitle("DANG KY KHOA HOC");
//        payRequest.setLanguage("vi");
//        payRequest.setTimeout(10 * 60 * 1000L);
//        payRequest.setDescription("DANG KY KHOA HOC " + StringUtils.upperCase(course.getCourseName()));
//        CreateTransactionResponse response = kPayClient.createTransaction(payRequest);
//        if (invoice != null) {
//            try {
//                kPayClient.cancelTransaction(new CancelTransactionRequest(invoice.getPayTransactionId()));
//            } catch (RuntimeException e) {
//                log.error("Cancel transaction failed");
//            }
//            invoice.setCode(code)
//                    .setPayTransactionId(response.getTransactionId())
//                    .setPayLinkCode(response.getPayLinkCode())
//                    .setTimeout(response.getTimeout())
//                    .setAmount(course.getPrice())
//                    .setUrl(response.getUrl())
//                    .setDescription(response.getDescription())
//                    .setVirtualAccount(response.getVirtualAccount())
//                    .setTime(getTime(response.getTime()))
//                    .setStatus(InvoiceStatus.CREATED);
//        } else {
//            invoice = new Invoice()
//                    .setUser(user)
//                    .setCourse(course)
//                    .setPayTransactionId(response.getTransactionId())
//                    .setCode(code)
//                    .setPayLinkCode(response.getPayLinkCode())
//                    .setTimeout(response.getTimeout())
//                    .setAmount(course.getPrice())
//                    .setUrl(response.getUrl())
//                    .setDescription(response.getDescription())
//                    .setVirtualAccount(response.getVirtualAccount())
//                    .setTime(getTime(response.getTime()))
//                    .setStatus(InvoiceStatus.CREATED);
//        }
//        if (amount <= 0) {
//            invoice.setStatus(InvoiceStatus.SUCCESS);
//            invoice.setTime(LocalDateTime.now());
//            course.getUsers().add(user);
//            user.getCourses().add(course);
//            teacher = course.getTeacher();
//            if (teacher == null) {
//                throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
//            }
//            long balance = teacher.getBalance() + invoice.getAmount() * (1 - feeService / 100);
//            teacher.setBalance(balance);
//            teacherService.save(teacher);
//            courseService.updateCourse(course);
//            userService.updateUser(user);
//        }
//        invoice = invoiceService.save(invoice);
//        return InvoiceStatus.CREATED.equals(invoice.getStatus()) ? invoice.getUrl() : "success";
//    }
//
//    @Override
//    public boolean confirm(@NonNull AbstractNotifyPaymentRequest request, String userId) {
//        return false;
//    }
//
//    private LocalDateTime getTime(String time) {
//        return LocalDateTime.parse(time);
//    }
//
//}
