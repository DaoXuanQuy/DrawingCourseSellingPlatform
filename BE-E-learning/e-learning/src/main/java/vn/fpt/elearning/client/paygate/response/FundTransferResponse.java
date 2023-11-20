package vn.fpt.elearning.client.paygate.response;

import lombok.*;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.enums.FTStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FundTransferResponse extends BaseResponseData {

    private String referenceNumber;
    private String txnNumber;
    private FTStatus status;
    private String transactionTime;

}