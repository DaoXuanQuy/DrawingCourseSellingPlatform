package vn.fpt.elearning.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProvinceDto {
    @JsonProperty("name")
    private String name;
    @JsonProperty("code")
    private Integer code;
    @JsonProperty("division_type")
    private String divisionType;
    @JsonProperty("codename")
    private String codename;
    @JsonProperty("phone_code")
    private Integer phoneCode;
    @JsonProperty("districts")
    private List<DistrictDto> districts;
}
