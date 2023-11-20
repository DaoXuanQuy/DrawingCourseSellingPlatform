package vn.fpt.elearning.entity;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "options")
@FieldNameConstants
@Accessors(chain = true)
@EqualsAndHashCode
public class Option {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(columnDefinition = "TEXT", name = "option_name")
    private String optionName;

    private Boolean correct;

    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;
}
