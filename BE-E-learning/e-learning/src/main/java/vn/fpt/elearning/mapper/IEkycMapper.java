package vn.fpt.elearning.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import vn.fpt.elearning.entity.Ekyc;
import vn.fpt.elearning.model.EkycDTO;
import vn.fpt.elearning.model.IdCardModel;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface IEkycMapper {
    Ekyc idCardModelToEkyc(IdCardModel idCardModel);
    EkycDTO toEkycDTO(Ekyc ekyc);
}
