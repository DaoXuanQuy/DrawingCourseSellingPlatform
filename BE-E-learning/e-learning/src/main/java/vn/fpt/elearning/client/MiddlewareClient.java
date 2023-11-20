//package vn.hcmute.elearning.client;
//
//
//import lombok.RequiredArgsConstructor;
//import lombok.SneakyThrows;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import request.client.vn.fpt.elearning.CheckBeneficiaryCoreRequest;
//import response.client.vn.fpt.elearning.CheckBeneficiaryCoreResponse;
//import response.client.vn.fpt.elearning.CoreResponseBase;
//import enums.vn.fpt.elearning.ResponseCode;
//import exception.vn.fpt.elearning.InternalException;
//import vn.unicloud.sdk.payment.KPayPacker;
//import vn.unicloud.sdk.payment.client.EncryptedBodyRequest;
//import vn.unicloud.sdk.payment.security.HeaderBase;
//import vn.unicloud.sdk.payment.security.PackedMessage;
//
//import java.util.Objects;
//
//@Component
//@Log4j2
//@RequiredArgsConstructor
//public class MiddlewareClient {
//
//    @Value("${middleware.host}")
//    private String middlewareHost;
//    private static final String FT_CHECK_BENEFICIARY_V2 = "/api/umee/v2/checkBeneficiary";
//    private static final String FT_SUBMIT_V2 = "/api/umee/v2/fundTransfer/submit";
//    private final RestClient restClient;
//
//    private final KPayPacker middlewarePacker;
//
//    private void validateHeader(HttpHeaders httpHeaders) {
//        try {
//            if (httpHeaders.containsKey(HeaderBase.CLIENT) &&
//                httpHeaders.containsKey(HeaderBase.SIGNATURE) &&
//                httpHeaders.containsKey(HeaderBase.TIMESTAMP)) {
//                return;
//            }
//        } catch (Exception e) {
//            log.error("Check header error: {}", e.getMessage());
//        }
//        throw new InternalException(ResponseCode.THIRD_PARTY_API_ERROR);
//    }
//
//    @SneakyThrows
//    private <T> T execute(String host, String path, HttpMethod method, Object request, Class<T> responseClassType) {
//        PackedMessage packedMessage = middlewarePacker.encode(request);
//        HttpHeaders headers = new HttpHeaders();
//        headers.add(HeaderBase.CLIENT, packedMessage.getClientId());
//        headers.add(HeaderBase.SIGNATURE, packedMessage.getSignature());
//        headers.add(HeaderBase.TIMESTAMP, String.valueOf(packedMessage.getTimestamp()));
//        EncryptedBodyRequest encryptedBodyRequest = new EncryptedBodyRequest(packedMessage.getEncryptedData());
//        ResponseEntity<CoreResponseBase> response = restClient.callAPI(
//            String.format("%s%s", host, path),
//            method,
//            headers,
//            encryptedBodyRequest,
//            CoreResponseBase.class);
//        if (!response.getStatusCode().equals(HttpStatus.OK)) {
//            throw new InternalException(ResponseCode.THIRD_PARTY_API_ERROR);
//        }
//        this.validateHeader(response.getHeaders());
//
//        CoreResponseBase<?> baseResponse = response.getBody();
//        if (baseResponse == null) {
//            throw new InternalException(ResponseCode.THIRD_PARTY_API_ERROR);
//        }
//        log.debug("Response: {}", baseResponse);
//        if (!baseResponse.isSuccess()) {
//            throw new InternalException(ResponseCode.THIRD_PARTY_API_ERROR);
//        }
//        String encryptedData = String.valueOf(baseResponse.getData());
//        return middlewarePacker.decode(
//            PackedMessage.builder()
//                .clientId(response.getHeaders().getFirst(HeaderBase.CLIENT))
//                .timestamp(Long.parseLong(Objects.requireNonNull(response.getHeaders().getFirst(HeaderBase.TIMESTAMP))))
//                .signature(response.getHeaders().getFirst(HeaderBase.SIGNATURE))
//                .encryptedData(encryptedData)
//                .build(),
//            responseClassType
//        );
//    }
//
//    public CheckBeneficiaryCoreResponse checkBankAccount(String bin, String accountNo) {
//        try {
//            return this.execute(
//                middlewareHost,
//                FT_CHECK_BENEFICIARY_V2,
//                HttpMethod.POST,
//                new CheckBeneficiaryCoreRequest(bin, accountNo),
//                CheckBeneficiaryCoreResponse.class
//            );
//        } catch (Exception ex) {
//            log.error("Invalid bank account");
//        }
//        return null;
//    }
//}
