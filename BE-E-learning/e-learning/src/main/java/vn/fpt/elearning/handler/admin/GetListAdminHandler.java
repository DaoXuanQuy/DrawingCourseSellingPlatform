package vn.fpt.elearning.handler.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.admin.request.GetListAdminRequest;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.mapper.IAdminMapper;
import vn.fpt.elearning.model.admin.AdministratorDto;
import vn.fpt.elearning.service.interfaces.IAdministratorService;
import vn.fpt.elearning.service.specifications.AdministratorSpecification;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetListAdminHandler extends RequestHandler<GetListAdminRequest, PageResponseData<AdministratorDto>> {
    private final IAdministratorService administratorService;
    private final AdministratorSpecification adminSpecification;
    private final IAdminMapper adminMapper;

    @Override
    public PageResponseData<AdministratorDto> handle(GetListAdminRequest request) {
        Specification<Administrator> specification = Specification.where(adminSpecification.likeFullName(request.getFullName()))
                .and(adminSpecification.gteCreateDate(request.fromDatetime(request.getFromDate())))
                .and(adminSpecification.lteCreateDate(request.toDatetime(request.getToDate())))
                .and(adminSpecification.equalStatus(request.getStatus()));

        Page<Administrator> page = administratorService.getPageAdmin(specification, request.getPageable());
        List<AdministratorDto> dataRes = adminMapper.toListAdminDto(page.getContent());

        return new PageResponseData<>(dataRes, page);
    }
}
