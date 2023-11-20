package vn.fpt.elearning.dtos.address.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.DistrictModel;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetDistrictsByProvinceV2Response extends BaseResponseData {
    private List<DistrictModel> districts;
}
