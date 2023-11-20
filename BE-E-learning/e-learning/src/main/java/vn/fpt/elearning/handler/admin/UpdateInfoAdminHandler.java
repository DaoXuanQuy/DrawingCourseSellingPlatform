package vn.fpt.elearning.handler.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.admin.request.UpdateInfoAdminRequest;
import vn.fpt.elearning.dtos.admin.response.UpdateInfoAdminResponse;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IAdminMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IAdministratorService;
@Component
@RequiredArgsConstructor
public class UpdateInfoAdminHandler extends RequestHandler<UpdateInfoAdminRequest, UpdateInfoAdminResponse> {
    
    private final IAdministratorService administratorService;
    private final IAdminMapper adminMapper;

    @Override
    public UpdateInfoAdminResponse handle(UpdateInfoAdminRequest request) {
        Administrator administrator = administratorService.getById(request.getId());

        if (administrator == null) {
            throw new InternalException(ResponseCode.ADMIN_IS_NOT_EXISTED);
        }

        administrator.setEmail(request.getEmail());
        administrator.setFullName(request.getFullName());

        Administrator administratorSave = administratorService.save(administrator);

        return new UpdateInfoAdminResponse(adminMapper.toAdministratorDto(administratorSave));
    }
}
