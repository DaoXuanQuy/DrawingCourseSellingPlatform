package vn.fpt.elearning.handler.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.admin.request.GetInfoAdminByIdRequest;
import vn.fpt.elearning.dtos.admin.response.GetInfoAdminResponse;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.IAdminMapper;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IAdministratorService;

@Component
@RequiredArgsConstructor
public class GetInfoAdminByIdHandler extends RequestHandler<GetInfoAdminByIdRequest, GetInfoAdminResponse> {
    private final IAdministratorService administratorService;
    private final IAdminMapper adminMapper;

    @Override
    public GetInfoAdminResponse handle(GetInfoAdminByIdRequest request) {
        Administrator administrator = administratorService.getById(request.getId());
        if (administrator == null) {
            throw new InternalException(ResponseCode.ADMIN_IS_NOT_EXISTED);
        }
        return new GetInfoAdminResponse(adminMapper.toAdministratorDto(administrator));
    }
}
