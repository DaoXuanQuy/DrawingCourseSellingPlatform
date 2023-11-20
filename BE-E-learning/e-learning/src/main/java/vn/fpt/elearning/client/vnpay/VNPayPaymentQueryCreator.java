package vn.fpt.elearning.client.vnpay;

import lombok.Builder;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import vn.fpt.elearning.utils.HashUtils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

@Builder
@Slf4j
public class VNPayPaymentQueryCreator {

    public static final String VNPAY_DATETIME_FORMAT_PATTERN = "yyyyMMddHHmmss";
    private static final String COMMAND = "pay";
    private static final String CURRENCY_CODE = "VND";
    private static final String VERSION = "2.1.0";

    @Builder.Default
    private long amount = 0L;
    private String bankCode;
    @Builder.Default
    private LocalDateTime createDate = LocalDateTime.now();
    private String email;
    private String firstName;
    private String lastName;
    private String ipAddress;
    private String ipnUrl;
    private String orderInfo;
    private String orderType;
    private String phone;
    private String returnUrl;
    private String terminalCode;
    private String txnRef;

    private String secret;

    public String getPaymentUrl(@NonNull String baseUrl) {

        SortedMap<String, String> queryStringMap = new TreeMap<>();
        queryStringMap.put("vnp_Command", COMMAND);
        queryStringMap.put("vnp_Version", VERSION);
        queryStringMap.put("vnp_TmnCode", terminalCode);
        queryStringMap.put("vnp_Amount", String.valueOf(amount * 100L));
        queryStringMap.put("vnp_CurrCode", "VND");
        if (StringUtils.isNotBlank(bankCode)) {
            queryStringMap.put("vnp_BankCode", bankCode);
        }
        queryStringMap.put("vnp_TxnRef", txnRef);
        queryStringMap.put("vnp_OrderInfo", orderInfo);
        queryStringMap.put("vnp_OrderType", "130005");
        queryStringMap.put("vnp_Locale", "vn");
        queryStringMap.put("vnp_ReturnUrl", returnUrl);
        queryStringMap.put("vnp_IpAddr", "127.0.0.1");
        queryStringMap.put("vnp_CreateDate", createDate.format(DateTimeFormatter.ofPattern(VNPAY_DATETIME_FORMAT_PATTERN)));
        queryStringMap.put("vnp_ExpireDate", LocalDateTime.from(createDate).plusMinutes(15L).format(DateTimeFormatter.ofPattern(VNPAY_DATETIME_FORMAT_PATTERN)));
        queryStringMap.put("vnp_Bill_Mobile", phone);
        queryStringMap.put("vnp_Bill_Email", email);
        if (StringUtils.isNotBlank(firstName)) {
            queryStringMap.put("vnp_Bill_FirstName", firstName);
        }
        if (StringUtils.isNotBlank(lastName)) {
            queryStringMap.put("vnp_Bill_LastName", lastName);
        }
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<Map.Entry<String, String>> itr = queryStringMap.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry<String, String> entry = itr.next();
            if (entry.getValue() == null) {
                continue;
            }
            hashData.append(entry.getKey());
            hashData.append('=');
            hashData.append(URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII));
            query.append(URLEncoder.encode(entry.getKey(), StandardCharsets.US_ASCII));
            query.append('=');
            query.append(URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII));
            if (itr.hasNext()) {
                query.append('&');
                hashData.append('&');
            }
        }
        String secureHash = HashUtils.hmacSHA512(secret, hashData.toString());
        query.append("&vnp_SecureHash=").append(secureHash);
        String queryUrl = query.toString();
        log.info("queryUrl: {}", queryUrl);
        return baseUrl + "?" + queryUrl;
    }
}
