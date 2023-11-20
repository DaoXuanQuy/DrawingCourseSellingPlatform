package vn.fpt.elearning.dtos.address.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetWardsByDistrictV2Request extends BaseRequestData {
    private Long districtId;
}
