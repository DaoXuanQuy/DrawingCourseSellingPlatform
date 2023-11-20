package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.entity.Province;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProvinceModel {
    private Long id;
    private String code;
    private String name;

    public ProvinceModel(Province province) {
        this.id = province.getId();
        this.code = province.getCode();
        this.name = province.getName();
    }
}
