//package vn.hcmute.elearning.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import vn.unicloud.sdk.payment.KPayPacker;
//
//@Configuration
//public class KienlongbankPayClient {
//    @Value("${klb.payment.client-id}")
//    private String clientId;
//
//    @Value("${klb.payment.encrypt-key}")
//    private String encryptKey;
//
//    @Value("${klb.payment.secret-key}")
//    private String secretKey;
//
//    @Value("${klb.payment.accept-time-diff}")
//    private Long acceptDiffTime;
//
//    @Bean
//    public KPayPacker payPacker() {
//        return new KPayPacker(clientId, encryptKey, secretKey, acceptDiffTime);
//    }
//}
