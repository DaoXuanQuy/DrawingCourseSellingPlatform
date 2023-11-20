package vn.fpt.elearning.dtos.address.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.ProvinceModel;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetAllProvinceV2Response extends BaseResponseData {
    private List<ProvinceModel> provinces;
}
