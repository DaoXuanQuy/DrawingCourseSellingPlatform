package vn.fpt.elearning.handler.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.admin.request.ResetPasswordAdminRequest;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.interfaces.IAdministratorService;

@Component
@RequiredArgsConstructor
public class ResetPasswordAdminHandler extends RequestHandler<ResetPasswordAdminRequest, StatusResponse> {
    private final IAdministratorService administratorService;
    private final KeycloakService keycloakService;

    @Override
    public StatusResponse handle(ResetPasswordAdminRequest request) {
        Administrator administrator = administratorService.getById(request.getId());
        if (administrator == null) {
            throw new InternalException(ResponseCode.ADMIN_IS_NOT_EXISTED);
        }
        boolean success = keycloakService.setUserPassword(administrator.getId(), request.getPassword());
        if (!success) {
            throw new InternalException(ResponseCode.FAILED);
        }
        return new StatusResponse();
    }
}
