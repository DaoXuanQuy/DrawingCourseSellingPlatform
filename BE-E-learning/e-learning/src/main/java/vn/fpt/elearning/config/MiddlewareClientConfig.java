//package vn.hcmute.elearning.config;
//
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import vn.unicloud.sdk.payment.KPayPacker;
//
//@Configuration
//public class MiddlewareClientConfig {
//
//    @Value("${middleware.client-id}")
//    private String middlewareClientId;
//
//    @Value("${middleware.encrypt-key}")
//    private String middlewareEncryptKey;
//
//    @Value("${middleware.secret-key}")
//    private String middlewareSecretKey;
//
//    @Value("${middleware.accept-time-diff}")
//    private Long acceptDiffTime;
//
//    @Bean
//    public KPayPacker middlewarePacker() {
//        return new KPayPacker(middlewareClientId, middlewareEncryptKey, middlewareSecretKey, acceptDiffTime);
//    }
//
//}
