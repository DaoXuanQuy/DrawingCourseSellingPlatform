//package vn.hcmute.elearning.client;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.google.gson.Gson;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import request.paygate.client.vn.fpt.elearning.FundTransferRequest;
//import request.paygate.client.vn.fpt.elearning.GetBalanceRequest;
//import request.paygate.client.vn.fpt.elearning.GetBeneficiaryRequest;
//import request.paygate.client.vn.fpt.elearning.QueryTransferRequest;
//import response.paygate.client.vn.fpt.elearning.FundTransferResponse;
//import response.paygate.client.vn.fpt.elearning.GetBalanceResponse;
//import response.paygate.client.vn.fpt.elearning.GetBeneficiaryResponse;
//import response.paygate.client.vn.fpt.elearning.QueryTransferResponse;
//import core.vn.fpt.elearning.BaseRequestData;
//import core.vn.fpt.elearning.BaseResponseData;
//import enums.vn.fpt.elearning.ResponseCode;
//import exception.vn.fpt.elearning.InternalException;
//import utils.vn.fpt.elearning.PaygateSecurityUtils;
//import vn.unicloud.sdk.payment.client.ResponseBase;
//import vn.unicloud.sdk.payment.security.SecurityUtils;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Objects;
//
//@Slf4j
//@Component
//public class PaygateClient {
//    private final RestTemplate restTemplate;
//    private final IRestClient restClient;
//    @Value("${paygate.account-no}")
//    private String accountNo;
//    @Value("${paygate.client-id}")
//    private String clientId;
//    @Value("${paygate.signature-key}")
//    private String secretKey;
//    @Value("${paygate.encrypt-key}")
//    private String encryptKey;
//    @Value("${paygate.max-timestamp-diff-ms}")
//    private Long maxTimestampDiff;
//    @Value("${paygate.host}")
//    private String host;
//    @Value("${paygate.core-bank.get-beneficiary-path}")
//    private String getBeneficiaryPath;
//    @Value("${paygate.core-bank.get-beneficiary-simple_path}")
//    private String getBeneficiarySimplePath;
//    @Value("${paygate.core-bank.get-balance-path}")
//    private String getBalancePath;
//    @Value("${paygate.core-bank.get-balance-simple-path}")
//    private String getBalanceSimplePath;
//    @Value("${paygate.core-bank.fund-transfer-path}")
//    private String fundTransferPath;
//    @Value("${paygate.core-bank.fund-transfer-simple-path}")
//    private String fundTransferSimplePath;
//    @Value("${paygate.core-bank.query-fund-transfer-path}")
//    private String queryFundTransferPath;
//    @Value("${paygate.core-bank.query-fund-transfer-simple-path}")
//    private String queryFundTransferSimplePath;
//
//    ObjectMapper mapper = new ObjectMapper();
//
//
//    public PaygateClient(@Qualifier("payRestTemplate") RestTemplate restTemplate, IRestClient restClient) {
//        this.restTemplate = restTemplate;
//        this.restClient = restClient;
//    }
//
//    private <T> ResponseEntity<T> execute(String url, HttpMethod httpMethod, HttpHeaders httpHeaders, Object request, Class<T> responseClassType) {
//        try {
//            HttpEntity<Object> httpEntity = new HttpEntity<>(request, httpHeaders);
//
//            log.debug("Calling EXTERNAL {} {}", httpMethod, url);
//
//            return restTemplate.exchange(url, httpMethod, httpEntity, responseClassType);
//
//        } catch (Exception e) {
//            log.error("Call api error: {}", e.getMessage());
//            throw new InternalException(ResponseCode.PAYMENT_SERVICE_UNAVAILABLE);
//        }
//    }
//
//    public <I extends BaseRequestData, T extends BaseResponseData> T callAPICoreBankSimple(String path, I request, Class<T> tclass) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("x-api-client", clientId);
//        String url = host + path;
//        // call API core bank
//        ResponseEntity<ResponseBase> response = this.execute(
//            url,
//            HttpMethod.POST,
//            headers,
//            request,
//            ResponseBase.class
//        );
//
//        //check response
//        if (response.getStatusCode() != HttpStatus.OK) {
//            throw new InternalException(ResponseCode.TRANSACTION_FAILED);
//        }
//        ResponseBase<T> responseBase = response.getBody();
//        if (responseBase == null) {
//            throw new InternalException(ResponseCode.TRANSACTION_FAILED);
//        }
//        log.debug("response : {}", responseBase);
//        ResponseCode responseCode = ResponseCode.valueOf(responseBase.getCode());
//        if (!responseCode.equals(ResponseCode.SUCCESS)) {
//            throw new InternalException(responseCode);
//        }
//
//        T resp =  mapper.convertValue(responseBase.getData(), tclass);
//        return resp;
//    }
//
//    public <I extends BaseRequestData, T extends BaseResponseData> T callAPICoreBank(String path, I request, Class<T> tclass) {
//
//        Long timestamp = System.currentTimeMillis();
//        // Encrypt request with encryptKey
//        log.debug("Data body: ", request);
//        Gson gson = new Gson();
//        String jsonString;
//        try {
//            jsonString = gson.toJson(request);
//        } catch (Exception e) {
//            log.error("Parse data error: {}", e.getMessage());
//            throw new InternalException(ResponseCode.TRANSACTION_FAILED);
//        }
//        String encryptData = PaygateSecurityUtils.encryptAES(jsonString, encryptKey);
//
//        //encrypt header validation
//        String signature = PaygateSecurityUtils.hmacEncode(
//            secretKey,
//            PaygateSecurityUtils.buildRawSignature(clientId, String.valueOf(timestamp), encryptData)
//
//        );
//
//        // Set headers
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("x-api-client", clientId);
//        headers.set("x-api-time", String.valueOf(timestamp));
//        headers.set("x-api-validate", signature);
//        String url = host + path;
//        Map<String, String> reqeustMap = new HashMap<>();
//        reqeustMap.put("data", encryptData);
//
//        // call API core bank
//        ResponseEntity<ResponseBase> response = this.execute(
//            url,
//            HttpMethod.POST,
//            headers,
//            reqeustMap,
//            ResponseBase.class
//        );
//
//        //check response
//        if (response.getStatusCode() != HttpStatus.OK) {
//            throw new InternalException(ResponseCode.TRANSACTION_FAILED);
//        }
//        ResponseBase<?> responseBase = response.getBody();
//        if (responseBase == null) {
//            throw new InternalException(ResponseCode.TRANSACTION_FAILED);
//        }
//        log.debug("response : {}", responseBase);
//        ResponseCode responseCode = ResponseCode.valueOf(responseBase.getCode());
//        if (responseCode == null) {
//            throw new InternalException(ResponseCode.CORE_BANK_TRANSACTION_FAIL);
//        }
//        if (!responseCode.equals(ResponseCode.SUCCESS)) {
//            throw new InternalException(responseCode);
//        }
//        String encryptResponse = (String) responseBase.getData();
//        if (encryptResponse == null) {
//            throw new InternalException(ResponseCode.CORE_BANK_TRANSACTION_FAIL);
//        }
//        HttpHeaders responseHeader = response.getHeaders();
//        if (!responseHeader.containsKey("x-api-client") ||
//            !responseHeader.containsKey("x-api-time") ||
//            !responseHeader.containsKey("x-api-validate")) {
//            throw new InternalException(ResponseCode.CORE_BANK_SECURITY_VIOLATION);
//        }
//
//        String clientId = responseHeader.getFirst("x-api-client");
//        timestamp = Long.parseLong(Objects.requireNonNull(responseHeader.getFirst("x-api-time")));
//        signature = responseHeader.getFirst("x-api-validate");
//
//        // check timestamp
//        long checkTime = System.currentTimeMillis() - timestamp;
//        if (System.currentTimeMillis() - timestamp > maxTimestampDiff) {
//            log.error("expire payment: {}, threshold: {}", checkTime, maxTimestampDiff);
//            throw new InternalException(ResponseCode.TRANSACTION_EXPIRED);
//        }
//        // check signature
//        try {
//            String signatureCheck = PaygateSecurityUtils.hmacEncode(
//                secretKey,
//                PaygateSecurityUtils.buildRawSignature(clientId, String.valueOf(timestamp), encryptResponse)
//            );
//            if (signatureCheck != null && signatureCheck.equals(signature)) {
//                // Decrypt Data
//                String decryptBodyString = PaygateSecurityUtils.decryptAES(encryptResponse, encryptKey);
//                log.debug("Decrypted Data Response {}: ", decryptBodyString);
//                return gson.fromJson(decryptBodyString, tclass);
//            }
//        } catch (Exception e) {
//            log.error("authenticate error: {}", e.getMessage());
//        }
//        throw new InternalException(ResponseCode.CORE_BANK_SECURITY_VIOLATION);
//    }
//
//    public GetBeneficiaryResponse getBeneficiarySimple(GetBeneficiaryRequest request) {
//        try {
//            GetBeneficiaryResponse response = callAPICoreBankSimple(getBeneficiarySimplePath, request, GetBeneficiaryResponse.class);
//            return response;
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.GET_BENEFICIARY_FAILED);
//        }
//    }
//    public GetBeneficiaryResponse getBeneficiary(GetBeneficiaryRequest request) {
//        try {
//            return callAPICoreBank(getBeneficiaryPath, request, GetBeneficiaryResponse.class);
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.GET_BENEFICIARY_FAILED);
//        }
//    }
//
//    public GetBalanceResponse getBalanceSimple() {
//        try {
//            GetBalanceRequest request =new GetBalanceRequest(accountNo);
//            return callAPICoreBankSimple(getBalanceSimplePath, request, GetBalanceResponse.class);
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.GET_BALANCE_FAILED);
//        }
//    }
//    public GetBalanceResponse getBalance() {
//        try {
//            GetBalanceRequest request =new GetBalanceRequest(accountNo);
//            return callAPICoreBank(getBalancePath, request, GetBalanceResponse.class);
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.GET_BALANCE_FAILED);
//        }
//    }
//    public FundTransferResponse fundTransfer(FundTransferRequest request) {
//        try {
//            return callAPICoreBank(fundTransferPath, request, FundTransferResponse.class);
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.FUND_TRANSFER_FAILED);
//        }
//    }
//    public FundTransferResponse fundTransferSimple(FundTransferRequest request) {
//        try {
//            return callAPICoreBankSimple(fundTransferSimplePath, request, FundTransferResponse.class);
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.FUND_TRANSFER_FAILED);
//        }
//    }
//    public QueryTransferResponse queryFundTransfer(QueryTransferRequest request) {
//        try {
//            return callAPICoreBank(queryFundTransferPath, request, QueryTransferResponse.class);
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.QUERY_FUND_TRANSFER_FAILED);
//        }
//    }
//    public QueryTransferResponse queryFundTransferSimple(QueryTransferRequest request) {
//        try {
//            return callAPICoreBankSimple(queryFundTransferSimplePath, request, QueryTransferResponse.class);
//        } catch (RuntimeException e) {
//            throw new InternalException(ResponseCode.QUERY_FUND_TRANSFER_FAILED);
//        }
//    }
//
//}
