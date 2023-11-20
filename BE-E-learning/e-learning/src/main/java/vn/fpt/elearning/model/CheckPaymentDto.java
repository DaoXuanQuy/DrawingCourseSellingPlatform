package vn.fpt.elearning.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckPaymentDto {
    @JsonProperty("vnp_Amount")
    private String vnpAmount;
    @JsonProperty("vnp_BankCode")
    private String vnpBankCode;
    @JsonProperty("vnp_CardHolder")
    private String vnpCardHolder;
    @JsonProperty("vnp_CardNumber")
    private String vnpCardNumber;
    @JsonProperty("vnp_FeeAmount")
    private String vnpFeeAmount;
    @JsonProperty("vnp_Issuer")
    private String vnpIssuer;
    @JsonProperty("vnp_Message")
    private String vnpMessage;
    @JsonProperty("vnp_OrderInfo")
    private String vnpOrderInfo;
    @JsonProperty("vnp_PayDate")
    private String vnpPayDate;
    @JsonProperty("vnp_ResponseCode")
    private String vnpResponseCode;
    @JsonProperty("vnp_TmnCode")
    private String vnpTmnCode;
    @JsonProperty("vnp_Trace")
    private String vnpTrace;
    @JsonProperty("vnp_TransactionNo")
    private String vnpTransactionNo;
    @JsonProperty("vnp_TransactionStatus")
    private String vnpTransactionStatus;
    @JsonProperty("vnp_TransactionType")
    private String vnpTransactionType;
    @JsonProperty("vnp_TxnRef")
    private String vnpTxnRef;
    @JsonProperty("vnp_SecureHash")
    private String vnpSecureHash;
}
