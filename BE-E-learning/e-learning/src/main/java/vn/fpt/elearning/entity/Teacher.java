package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.TeacherStatus;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "teacher")
@FieldNameConstants
@Accessors(chain = true)
public class Teacher extends Auditable<String> {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    private Ekyc ekyc;

    @Enumerated(EnumType.STRING)
    private TeacherStatus status;

    private String reasonDeny;

    private LocalDateTime approveDate;

    private String accountNo;

    private String accountName;

    private String bin;

    @Column
    @ColumnDefault("0")
    private long balance;

    public boolean checkLinkedAccount() {
        return StringUtils.isNotBlank(accountNo) && StringUtils.isNotBlank(accountName) && StringUtils.isNotBlank(bin);
    }
}
