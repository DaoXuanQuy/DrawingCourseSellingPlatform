//package vn.hcmute.elearning.config.websocket;
//
//import lombok.AllArgsConstructor;
//import lombok.SneakyThrows;
//import lombok.extern.slf4j.Slf4j;
//import org.keycloak.TokenVerifier;
//import org.keycloak.common.VerificationException;
//import org.keycloak.representations.AccessToken;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
////import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Slf4j
//@Component
//@Qualifier("websocket")
//@AllArgsConstructor
//public class KeycloakWebSocketAuthManager implements AuthenticationManager {
//
//    private final TokenVerifier<AccessToken>  tokenVerifier;
//
//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        JWSAuthenticationToken token = (JWSAuthenticationToken) authentication;
//        String tokenString = (String) token.getCredentials();
//        try {
//            AccessToken accessToken = TokenVerifier.create(tokenString, AccessToken.class).getToken();
//            List<GrantedAuthority> authorities = accessToken.getRealmAccess().getRoles().stream()
//                    .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
//            User user = new User(accessToken.getName(), accessToken.getEmail(),authorities);
//            token = new JWSAuthenticationToken(tokenString, user, authorities);
//            token.setAuthenticated(true);
//        } catch (VerificationException e) {
//            log.debug("Exception authenticating the token {}:", tokenString, e);
//            throw new BadCredentialsException("Invalid token");
//        }
//        return token;
//    }
//
//}
