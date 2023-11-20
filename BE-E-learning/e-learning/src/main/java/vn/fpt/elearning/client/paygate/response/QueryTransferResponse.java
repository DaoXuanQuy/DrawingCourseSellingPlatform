package vn.fpt.elearning.client.paygate.response;

import lombok.*;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.enums.FTStatus;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QueryTransferResponse extends BaseResponseData {

    private String referenceNumber;
    private String txnNumber;
    private FTStatus status;
    private BigDecimal amount;
    private String description;
    private String transactionTime;

}
