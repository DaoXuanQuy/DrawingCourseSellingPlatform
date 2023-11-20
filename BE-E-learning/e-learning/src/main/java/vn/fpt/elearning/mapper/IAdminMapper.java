package vn.fpt.elearning.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import vn.fpt.elearning.entity.Administrator;
import vn.fpt.elearning.model.admin.AdministratorDto;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface IAdminMapper {
    AdministratorDto toAdministratorDto(Administrator administrator);

    Administrator toAdministrator(AdministratorDto administratorDto);

    List<AdministratorDto> toListAdminDto(List<Administrator> administrators);
}
