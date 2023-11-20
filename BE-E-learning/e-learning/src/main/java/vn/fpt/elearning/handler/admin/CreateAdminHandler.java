package vn.fpt.elearning.handler.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.admin.request.CreateAdminRequest;
import vn.fpt.elearning.dtos.admin.response.CreateAdminResponse;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.enums.AdminStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.enums.Role;
import vn.fpt.elearning.mapper.IAdminMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.KeycloakService;
import vn.fpt.elearning.service.interfaces.IAdministratorService;

@Component
@RequiredArgsConstructor
@Slf4j
public class CreateAdminHandler extends RequestHandler<CreateAdminRequest, CreateAdminResponse> {
    private final IAdministratorService administratorService;
    private final KeycloakService keycloakService;
    private final IAdminMapper adminMapper;

    @Override
    public CreateAdminResponse handle(CreateAdminRequest request) {
        Administrator administrator = administratorService.getByPhone(request.getPhone());
        if (administrator != null) {
            throw new InternalException(ResponseCode.ADMIN_IS_EXISTED);
        }
        String userId = keycloakService.createUser(request.getPhone(), request.getPassword(), request.getEmail(), request.getFullName(), "", Role.ADMIN);
        if (userId == null) {
            throw new InternalException(ResponseCode.ADMIN_CREATE_FAILED);
        }
        administrator = new Administrator()
                .setId(userId)
                .setEmail(request.getEmail())
                .setFullName(request.getFullName())
                .setPhone(request.getPhone())
                .setStatus(AdminStatus.ACTIVE);
        Administrator administratorSave = administratorService.save(administrator);

        return new CreateAdminResponse(adminMapper.toAdministratorDto(administratorSave));
    }
}
