package vn.fpt.elearning.dtos.address.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetDistrictsByProvinceRequest extends BaseRequestData {
    @NotNull
    private Integer provinceCode;
}
