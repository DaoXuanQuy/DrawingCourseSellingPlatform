package vn.fpt.elearning.handler.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.admin.request.UnbanAdminRequest;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.enums.AdminStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IAdministratorService;

@Component
@RequiredArgsConstructor
public class UnbanAdminHandler extends RequestHandler<UnbanAdminRequest, StatusResponse> {
    
    private final IAdministratorService administratorService;

    @Override
    public StatusResponse handle(UnbanAdminRequest request) {
        Administrator administrator = administratorService.getById(request.getId());

        if (administrator == null) {
            throw new InternalException(ResponseCode.ADMIN_IS_NOT_EXISTED);
        }

        administrator.setStatus(AdminStatus.ACTIVE);
        administratorService.save(administrator);

        return new StatusResponse();
    }
}

