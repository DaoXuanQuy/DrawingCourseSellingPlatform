//package vn.hcmute.elearning.config.websocket;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
//import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//
//@Configuration
//public class WebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/secured/websocket")
//                .setAllowedOriginPatterns("*").withSockJS();
//    }
//
//
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry registry) {
//        registry.setApplicationDestinationPrefixes("/app");
//        registry.enableSimpleBroker("/secured/topic", "/secured/agent", "/topic");
//    }
//
//    @Override
//    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
//        messages
//                .anyMessage().authenticated();
//    }
//
//    @Override
//    protected boolean sameOriginDisabled() {
//        return true;
//    }
//
//}
