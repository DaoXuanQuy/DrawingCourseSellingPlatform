package vn.fpt.elearning.dtos.invoice.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotifyKLBPayRequest extends AbstractNotifyPaymentRequest {

    private String virtualAccount;

    private String actualAccount;

    private String fromBin;

    private String fromAccount;

    private boolean success;

    private String time;
}
