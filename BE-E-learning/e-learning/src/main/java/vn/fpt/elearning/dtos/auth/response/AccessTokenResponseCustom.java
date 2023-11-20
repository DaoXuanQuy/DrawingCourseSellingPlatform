package vn.fpt.elearning.dtos.auth.response;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.keycloak.representations.AccessTokenResponse;
import vn.fpt.elearning.core.BaseResponseData;

import java.util.HashMap;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class AccessTokenResponseCustom extends BaseResponseData {
    protected String token;

    protected long expiresIn;

    protected long refreshExpiresIn;

    protected String refreshToken;

    protected String tokenType;

    protected String idToken;

    protected int notBeforePolicy;

    protected String sessionState;

    protected Map<String, Object> otherClaims = new HashMap<>();

    // OIDC Financial API Read Only Profile : scope MUST be returned in the response from Token Endpoint
    @JsonProperty("scope")
    protected String scope;

    public AccessTokenResponseCustom() {

    }

    public AccessTokenResponseCustom(AccessTokenResponse accessTokenResponse) {
        this.token = accessTokenResponse.getToken();
        this.idToken = accessTokenResponse.getIdToken();
        this.expiresIn = accessTokenResponse.getExpiresIn();
        this.refreshToken = accessTokenResponse.getRefreshToken();
        this.tokenType = accessTokenResponse.getTokenType();
        this.notBeforePolicy = accessTokenResponse.getNotBeforePolicy();
        this.sessionState = accessTokenResponse.getSessionState();
        this.otherClaims = accessTokenResponse.getOtherClaims();
        this.scope = accessTokenResponse.getScope();
    }

    public AccessTokenResponse toAccessTokenResponse() {
        AccessTokenResponse accessTokenResponse = new AccessTokenResponse();
        accessTokenResponse.setToken(this.token);
        accessTokenResponse.setIdToken(this.idToken);
        accessTokenResponse.setExpiresIn(this.expiresIn);
        accessTokenResponse.setRefreshToken(this.refreshToken);
        accessTokenResponse.setTokenType(this.tokenType);
        accessTokenResponse.setNotBeforePolicy(this.notBeforePolicy);
        accessTokenResponse.setSessionState(this.sessionState);
        for (String key : this.otherClaims.keySet()) {
            accessTokenResponse.setOtherClaims(key, this.otherClaims.get(key));
        }
        accessTokenResponse.setScope(this.scope);
        return accessTokenResponse;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    @JsonProperty(value = "token", access = JsonProperty.Access.READ_ONLY)
    public String getToken() {
        return token;
    }

    @JsonProperty(value = "access_token", access = JsonProperty.Access.WRITE_ONLY)
    public void setToken(String token) {
        this.token = token;
    }

    @JsonProperty(value = "expiresIn", access = JsonProperty.Access.READ_ONLY)
    public long getExpiresIn() {
        return expiresIn;
    }

    @JsonProperty(value = "expires_in", access = JsonProperty.Access.WRITE_ONLY)
    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    @JsonProperty(value = "refreshExpiresIn", access = JsonProperty.Access.READ_ONLY)
    public long getRefreshExpiresIn() {
        return refreshExpiresIn;
    }

    @JsonProperty(value = "refresh_expires_in", access = JsonProperty.Access.WRITE_ONLY)
    public void setRefreshExpiresIn(long refreshExpiresIn) {
        this.refreshExpiresIn = refreshExpiresIn;
    }

    @JsonProperty(value = "refreshToken", access = JsonProperty.Access.READ_ONLY)
    public String getRefreshToken() {
        return refreshToken;
    }

    @JsonProperty(value = "refresh_token", access = JsonProperty.Access.WRITE_ONLY)
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @JsonProperty(value = "tokenType", access = JsonProperty.Access.READ_ONLY)
    public String getTokenType() {
        return tokenType;
    }

    @JsonProperty(value = "token_type", access = JsonProperty.Access.WRITE_ONLY)
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    @JsonProperty(value = "idToken", access = JsonProperty.Access.READ_ONLY)
    public String getIdToken() {
        return idToken;
    }

    @JsonProperty(value = "id_token", access = JsonProperty.Access.WRITE_ONLY)
    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    @JsonProperty(value = "notBeforePolicy", access = JsonProperty.Access.READ_ONLY)
    public int getNotBeforePolicy() {
        return notBeforePolicy;
    }

    @JsonProperty(value = "not-before-policy", access = JsonProperty.Access.WRITE_ONLY)
    public void setNotBeforePolicy(int notBeforePolicy) {
        this.notBeforePolicy = notBeforePolicy;
    }

    @JsonProperty(value = "sessionState", access = JsonProperty.Access.READ_ONLY)
    public String getSessionState() {
        return sessionState;
    }

    @JsonProperty(value = "session_state", access = JsonProperty.Access.WRITE_ONLY)
    public void setSessionState(String sessionState) {
        this.sessionState = sessionState;
    }

    @JsonAnyGetter
    public Map<String, Object> getOtherClaims() {
        return otherClaims;
    }

    @JsonAnySetter
    public void setOtherClaims(String name, Object value) {
        otherClaims.put(name, value);
    }
}
