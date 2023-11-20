package vn.fpt.elearning.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.keycloak.adapters.AdapterDeploymentContext;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationEntryPoint;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RestAuthenticationEntryPoint extends KeycloakAuthenticationEntryPoint {

    private final ObjectMapper mapper = new ObjectMapper();

    public RestAuthenticationEntryPoint(AdapterDeploymentContext adapterDeploymentContext) {
        super(adapterDeploymentContext);
    }

    @Override
    protected void commenceUnauthorizedResponse(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ResponseEntity<Object> responseDto = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_OK);
        response.getOutputStream().print(mapper.writeValueAsString(responseDto));
    }
}
