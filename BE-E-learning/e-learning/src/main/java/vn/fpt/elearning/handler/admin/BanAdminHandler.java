package vn.fpt.elearning.handler.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.admin.request.BanAdminRequest;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.enums.AdminStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.RedisService;
import vn.fpt.elearning.service.interfaces.IAdministratorService;

@Component
@RequiredArgsConstructor
public class BanAdminHandler extends RequestHandler<BanAdminRequest, StatusResponse> {
    private final IAdministratorService administratorService;
    private final RedisService redisService;
    private final KeycloakService keycloakService;

    @Override
    public StatusResponse handle(BanAdminRequest request) {
        Administrator administrator = administratorService.getById(request.getId());
        if (administrator == null) {
            throw new InternalException(ResponseCode.ADMIN_IS_NOT_EXISTED);
        }
        if (administrator.getId().equals(request.getUserId())) {
            throw new InternalException(ResponseCode.ADMIN_NOT_INACTIVE_YOURSELF);
        }
        administrator.setStatus(AdminStatus.INACTIVE);
        administratorService.save(administrator);

        keycloakService.revokeAllSessionUser(administrator.getId());
        return new StatusResponse();
    }
}
