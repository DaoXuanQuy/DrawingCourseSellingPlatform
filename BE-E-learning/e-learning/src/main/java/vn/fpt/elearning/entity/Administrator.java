package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import vn.fpt.elearning.enums.AdminStatus;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "administrator")
@FieldNameConstants
@Accessors(chain = true)
public class Administrator extends Auditable<String> {
    @Id
    private String id;

    private String phone;

    private String email;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private AdminStatus status;

}
