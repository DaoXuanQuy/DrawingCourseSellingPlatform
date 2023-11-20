package vn.fpt.elearning.config.websocket;

import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.keycloak.TokenVerifier;
import org.keycloak.representations.AccessToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.service.interfaces.IUserService;

@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@Log4j2
public class WebSocketAuthenticationConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketAuthenticationConfig.class);
    private final IUserService iUserService;

    public WebSocketAuthenticationConfig(IUserService iUserService) {
        this.iUserService = iUserService;
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @SneakyThrows
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (accessor != null) {
                    String authHeader = accessor.getFirstNativeHeader("Authorization");
                    authHeader = authHeader == null ? null : authHeader.split(" ")[1];

                    if (StompCommand.CONNECT.equals(accessor.getCommand()) && authHeader != null) {
                        AccessToken token = TokenVerifier.create(authHeader, AccessToken.class).getToken();
                        User user = iUserService.getUserById(token.getSubject());
                        log.debug("priciple: {}", token.getSubject());
                        user.setIsOnline(true);
                        user.setSessionId(accessor.getSessionId());
                        iUserService.createUser(user);
                    } else if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
                        User user = iUserService.getUserBySessionId(accessor.getSessionId());
                        if (user != null) {
                            user.setIsOnline(false);
                            iUserService.createUser(user);
                        }
                    }
                }
                return message;
            }
        });
    }
}
