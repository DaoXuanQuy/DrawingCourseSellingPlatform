package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.entity.District;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DistrictModel {
    private Long id;
    private String name;
    private String prefix;
    public DistrictModel(District district) {
        this.id = district.getId();
        this.name = district.getName();
        this.prefix = district.getPrefix();
    }
}
