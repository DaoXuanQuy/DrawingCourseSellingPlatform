package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.entity.Ward;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WardModel {
    private Long id;
    private String name;
    private String prefix;

    public WardModel(Ward ward) {
        this.id = ward.getId();
        this.name = ward.getName();
        this.prefix = ward.getPrefix();
    }
}
