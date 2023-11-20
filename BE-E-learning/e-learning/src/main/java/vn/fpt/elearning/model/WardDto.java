package vn.fpt.elearning.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WardDto {
    @JsonProperty("name")
    private String name;
    @JsonProperty("code")
    private Integer code;
    @JsonProperty("division_type")
    private String divisionType;
    @JsonProperty("codename")
    private String codename;
    @JsonProperty("district_code")
    private Integer districtCode;
}
