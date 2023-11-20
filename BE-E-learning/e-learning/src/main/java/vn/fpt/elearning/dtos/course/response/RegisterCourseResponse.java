package vn.fpt.elearning.dtos.course.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import vn.fpt.elearning.core.BaseResponseData;

@Getter
@Setter
@NoArgsConstructor
public class RegisterCourseResponse extends BaseResponseData {
    private String paymentUrl;
    private boolean success  = false;

    public RegisterCourseResponse(String paymentUrl) {
        if (StringUtils.equals(paymentUrl, "success")) {
            this.success = true;
        }
        this.paymentUrl = paymentUrl;
    }
}
