package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.PaymentType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCourseRequest extends BaseRequestData {

    @NotBlank
    private String courseId;
    @NotNull
    private PaymentType paymentType;
}
