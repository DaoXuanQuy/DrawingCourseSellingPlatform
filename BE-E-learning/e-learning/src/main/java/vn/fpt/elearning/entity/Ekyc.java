package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ekyc")
@FieldNameConstants
@Accessors(chain = true)
public class Ekyc extends Auditable<String> {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    private String address;

    private String birthday;

    private String characteristics;

    private String district;

    private String document;

    private String expiry;

    private String optionalData;

    private String hometown;

    private String no;

    private String idType;

    private String idCheck;

    private String passportType;

    private String idLogic;

    private String idLogicMessage;

    private String issueBy;

    private String issueDate;

    private String name;

    private String province;

    private String sex;

    private String street;

    private String ward;

    private String national;

    private String ethnicity;

    private String religion;

    private String frontUrl;

    private String backUrl;

}
