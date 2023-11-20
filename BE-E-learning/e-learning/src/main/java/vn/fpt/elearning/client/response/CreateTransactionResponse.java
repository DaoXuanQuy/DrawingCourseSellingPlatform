package vn.fpt.elearning.client.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateTransactionResponse {

    private String transactionId;

    private String refTransactionId;

    private String payLinkCode;

    private Long timeout;

    private String url;

    private String virtualAccount;

    private String description;

    private long amount;

    private String qrCodeString;

    private PayTransactionStatus status;

    private String time;

    @JsonIgnore
    private String payLinkId;

}
