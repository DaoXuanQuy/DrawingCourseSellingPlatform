package vn.fpt.elearning.utils;

import org.keycloak.representations.AccessToken;
import vn.fpt.elearning.enums.Role;

import java.util.Set;

public class ValidateUtils {
    private static final String RESOURCE_ACCESS = "e-learning-client";

    public static boolean isRootAdmin(AccessToken token) {
        try {
            Set<String> roles = token.getResourceAccess().get(RESOURCE_ACCESS).getRoles();
            if (roles.contains(Role.ROOT_ADMIN.name())) {
                return true;
            }
        } catch (Exception ex) {
            return false;
        }
        return false;
    }
}
