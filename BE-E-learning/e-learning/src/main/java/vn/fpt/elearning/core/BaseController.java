package vn.fpt.elearning.core;

import lombok.Getter;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import vn.fpt.elearning.core.controller.IBaseController;
import vn.fpt.elearning.service.RedisService;

@Getter
public class BaseController implements IBaseController {

    @Autowired
    protected SpringBus springBus;

    @Autowired
    private RedisService redisService;

    protected <T extends BaseRequestData, I extends BaseResponseData> ResponseEntity<ResponseBase<I>> execute(T request, Class<I> response) {
        return this.execute(request);
    }

    public <T extends BaseRequestData, I extends BaseResponseData> ResponseEntity<ResponseBase<I>> execute(T request) {
        String sessionId = getSessionId();
        if (sessionId != null) {
            String subjectId = redisService.getValue(sessionId, String.class);
            if (subjectId == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            request.setUserId(subjectId);
        }
        return ResponseEntity.ok(new ResponseBase<>(this.springBus.execute(request)));
    }

    protected String getSessionId() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String sessionId = null;
        if (securityContext.getAuthentication().getName().startsWith("anonymous")) {
            return null;
        }
        KeycloakAuthenticationToken keycloakAuthenticationToken = (KeycloakAuthenticationToken) securityContext.getAuthentication();
        AccessToken accessToken = keycloakAuthenticationToken.getAccount().getKeycloakSecurityContext().getToken();
        if (accessToken != null) {
            sessionId = accessToken.getSessionState();
        }
        return sessionId;
    }

//    protected ResponseEntity<ResponseBase<String>> buildResponse(PackedMessage packedMessage) {
//        //Set header
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set(HeaderBase.CLIENT, packedMessage.getClientId());
//        responseHeaders.set(HeaderBase.TIMESTAMP, String.valueOf(packedMessage.getTimestamp()));
//        responseHeaders.set(HeaderBase.SIGNATURE, packedMessage.getSignature());
//        return ResponseEntity.ok()
//            .headers(responseHeaders)
//            .body(new ResponseBase<>(packedMessage.getEncryptedData()));
//    }

}
