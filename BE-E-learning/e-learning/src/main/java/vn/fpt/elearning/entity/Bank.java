package vn.fpt.elearning.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Bank.COLLECTION_NAME)
@FieldNameConstants
public class Bank extends Auditable<String> {

    public static final String COLLECTION_NAME = "bank";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String shortName;

    private String commonName;

    private String citad;

    private boolean napasSupported;

    private String napasCode;

    private String benId;

    private String swift;

    private boolean vietQrSupported;

    private String logo;
    private String code;
    private String icon;

    public String emailNameFormat() {
        return String.format("%s (%s, %s)", name, shortName, code);
    }
}
