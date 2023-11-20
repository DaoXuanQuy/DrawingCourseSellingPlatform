package vn.fpt.elearning.dtos.invoice.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import vn.fpt.elearning.client.vnpay.VNPayPaymentQueryCreator;
import vn.fpt.elearning.utils.HashUtils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

@Getter
@Setter
public class NotifyVNPayRequest extends AbstractNotifyPaymentRequest {

    private final SortedMap<String, String> queryStringMap;

    @JsonProperty("vnp_TmnCode")
    private String terminalCode;
    @JsonProperty("vnp_BankCode")
    private String bankCode;
    @JsonProperty("vnp_CardType")
    private String cardType;
    @JsonProperty("vnp_ResponseCode")
    private String responseCode;
    @JsonProperty("vnp_TransactionStatus")
    private String transactionStatus;
    @JsonProperty("vnp_SecureHashType")
    private String secureHashType;
    @JsonProperty("vnp_SecureHash")
    private String secureHash;
    @JsonProperty("vnp_PayDate")
    @JsonFormat(pattern = VNPayPaymentQueryCreator.VNPAY_DATETIME_FORMAT_PATTERN)
    private LocalDateTime payDate;

    public NotifyVNPayRequest(Map<String, String> map) {
        queryStringMap = new TreeMap<>(map);
        this.amount = Long.valueOf(queryStringMap.get("vnp_Amount"));
        this.bankCode = queryStringMap.get("vnp_BankCode");
        this.txnNumber = queryStringMap.get("vnp_BankTranNo");
        this.cardType  = queryStringMap.get("vnp_CardType");
        this.transferDesc = queryStringMap.get("vnp_OrderInfo");
        this.payDate = LocalDateTime.parse(queryStringMap.get("vnp_PayDate"), DateTimeFormatter.ofPattern(VNPayPaymentQueryCreator.VNPAY_DATETIME_FORMAT_PATTERN));
        this.responseCode = queryStringMap.get("vnp_ResponseCode");
        this.secureHash = queryStringMap.get("vnp_SecureHash");
        this.terminalCode = queryStringMap.get("vnp_TmnCode");
        this.transactionId = queryStringMap.get("vnp_TransactionNo");
        this.transactionStatus = queryStringMap.get("vnp_TransactionStatus");
        this.refTransactionId = queryStringMap.get("vnp_TxnRef");
    }

    public boolean validate(String secret) {
        if (queryStringMap.containsKey("vnp_SecureHashType")) {
            queryStringMap.remove("vnp_SecureHashType");
        }
        if (queryStringMap.containsKey("vnp_SecureHash")) {
            queryStringMap.remove("vnp_SecureHash");
        }
        StringBuilder hashData = new StringBuilder();
        Iterator<Map.Entry<String, String>> itr = queryStringMap.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry<String, String> entry = itr.next();
            if (StringUtils.isBlank(entry.getValue())) {
                continue;
            }
            hashData.append(entry.getKey());
            hashData.append('=');
            hashData.append(URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII));
            if (itr.hasNext()) {
                hashData.append('&');
            }
        }
        return HashUtils.hmacSHA512(secret, hashData.toString()).equals(secureHash);
    }
}
