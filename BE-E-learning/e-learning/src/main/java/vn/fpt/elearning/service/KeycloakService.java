package vn.fpt.elearning.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.keycloak.representations.idm.UserSessionRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import vn.fpt.elearning.dtos.auth.response.AccessTokenResponseCustom;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.enums.Role;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IUserService;

import javax.ws.rs.core.Response;
import java.util.LinkedList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class KeycloakService {
    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.auth-server-url}")
    private String authUrl;

    @Value("${keycloak.resource}")
    private String clientId;

    @Value("${keycloak.credentials.secret}")
    private String secretKey;

    @Value("${keycloak-client.username}")
    private String username;

    @Value("${keycloak-client.password}")
    private String password;

    @Value("${role.student}")
    private String roleStudent;

    @Value("${role.teacher}")
    private String roleTeacher;

    @Value("${role.admin}")
    private String roleAdmin;

    private Keycloak keycloakAdmin;
    private final IUserService userService;
    private final RedisService redisService;

    @Bean
    public void initKeycloakService() {
        keycloakAdmin = KeycloakBuilder.builder()
            .serverUrl(authUrl)
            .realm("master")
            .clientId("admin-cli")
            .username(username)
            .password(password)
            .clientSecret(secretKey)
            .grantType("password")
            .resteasyClient(
                new ResteasyClientBuilderImpl()
                    .connectionPoolSize(10).build()
            )
            .build();
    }

    public AccessTokenResponseCustom getUserJWT(String username, String password) {
        try {
            Keycloak keycloakUser = KeycloakBuilder.builder()
                .serverUrl(authUrl)
                .realm(realm)
                .clientId(clientId)
                .clientSecret(secretKey)
                .username(username)
                .password(password)
                .grantType("password")
                .build();


            AccessTokenResponse accessTokenResponse = keycloakUser.tokenManager().getAccessToken();
            return new AccessTokenResponseCustom(accessTokenResponse);
        } catch (Exception e) {
            throw new InternalException(ResponseCode.PASSWORD_INCORRECT);
        }
    }

    public String createUser(String username, String password, String email, String firstName, String lastName, Role role) {
        String roleKC = null;
        if (role == Role.STUDENT) {
            roleKC = this.roleStudent;
        } else if (role == Role.TEACHER) {
            roleKC = this.roleTeacher;
        } else if (role == Role.ADMIN) {
            roleKC = this.roleAdmin;
        }
        UserRepresentation user = new UserRepresentation();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEnabled(true);
        user.setEmailVerified(false);
        user.setUsername(username);
        if (email != null) {
            user.setEmail(email);
        }
        RealmResource realmResource = keycloakAdmin.realm(realm);
        UsersResource usersResource = realmResource.users();

        try (Response response = usersResource.create(user)) {
            log.info("Create keycloak user response: {}", response.getStatus());
            if (response.getStatus() == 201 || response.getStatus() == 200) {

                String userId = CreatedResponseUtil.getCreatedId(response);

                CredentialRepresentation credentialRepresentation = createPasswordCredentials(password);

                UserResource userResource = usersResource.get(userId);
                userResource.resetPassword(credentialRepresentation);
                this.addRoleResource(userId, roleKC);

                return userId;

            }
        } catch (Exception ex) {
            ex.printStackTrace();
            log.error(ex.getLocalizedMessage());
        }

        return null;
    }

    private CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredential = new CredentialRepresentation();
        passwordCredential.setTemporary(false);
        passwordCredential.setType(CredentialRepresentation.PASSWORD);
        passwordCredential.setValue(password);

        return passwordCredential;
    }

    public boolean deleteUser(String id) {
        try {
            keycloakAdmin.realm(realm).users().delete(id);
            return true;
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            return false;
        }
    }

    public String getUserByEmail(String email) {
        try {
            UsersResource usersResource = keycloakAdmin.realm(realm).users();
            List<UserRepresentation> users = usersResource.search(null, null, null, email, null, null);
            UserRepresentation userRepresentation = users.stream().filter(user -> user.getEmail().equals(email)).findFirst().orElse(null);
            return userRepresentation != null ? userRepresentation.getId() : null;
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
        }
        return null;
    }

    public String getUserIdByUserName(String username) {
        try {
            UsersResource usersResource = keycloakAdmin.realm(realm).users();
            List<UserRepresentation> users = usersResource.search(username, null, null, null, null, null);
            UserRepresentation userId = users.stream().filter(user -> user.getUsername().equals(username)).findFirst().orElse(null);
            return userId != null ? userId.getId() : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean setUserPassword(String userId, String newPassword) {
        try {
            UserResource userResource = keycloakAdmin.realm(realm).users().get(userId);
            CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
            credentialRepresentation.setTemporary(false);
            credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
            credentialRepresentation.setValue(newPassword);
            userResource.resetPassword(credentialRepresentation);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @SneakyThrows
    public AccessTokenResponseCustom refreshToken(String refreshToken) {
        // Create header
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("grant_type", "refresh_token");
        map.add("refresh_token", refreshToken);
        map.add("client_secret", secretKey);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, httpHeaders);

        RestTemplate restTemplate = new RestTemplate();
        String url = authUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        ResponseEntity<String> keycloakResponse = restTemplate.postForEntity(url, request, String.class);
        if (keycloakResponse.getStatusCode() == HttpStatus.OK) {
            return new ObjectMapper().readValue(keycloakResponse.getBody(), AccessTokenResponseCustom.class);
        }
        return null;
    }

    public void addRoleResource(String userId, String role) {
        UserResource userResource = keycloakAdmin.realm(realm).users().get(userId);
        String idClient = keycloakAdmin.realm(realm).clients().findByClientId(clientId).get(0).getId();
        List<RoleRepresentation> listRole = new LinkedList<>();

        listRole.add(keycloakAdmin
            .realm(realm)
            .clients()
            .get(idClient)
            .roles()
            .get(role)
            .toRepresentation());
        userResource.roles().clientLevel(idClient).add(listRole);
    }
    public boolean invalidateToken(String refreshToken) {
        MultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("client_id", clientId);
        requestParams.add("client_secret", secretKey);
        requestParams.add("refresh_token", refreshToken);
        requestParams.add("revoke_tokens_on_logout ", "true");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestParams, headers);

        String url = authUrl + "/realms/" + realm + "/protocol/openid-connect/logout";

        RestTemplate restTemplate = new RestTemplate();
        try {
            log.info("logout response {}", restTemplate.postForEntity(url, request, Object.class));
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

    public boolean revokeAllSessionUser(String userId) {
        RealmResource realmResource = keycloakAdmin.realm(realm);
        UserResource userResource = realmResource
                .users()
                .get(userId);
        List<UserSessionRepresentation> userRepresentations = userResource.getUserSessions();
        try {
            userRepresentations.forEach(session -> {
                realmResource.deleteSession(session.getId());
                redisService.deleteKey(session.getId());
            });
        } catch (Exception e) {
            log.debug("error revoke session: {}", e.getLocalizedMessage());
            return false;
        }
        return true;
    }

}
