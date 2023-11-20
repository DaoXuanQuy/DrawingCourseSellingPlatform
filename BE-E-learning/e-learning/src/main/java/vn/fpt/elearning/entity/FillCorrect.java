package vn.fpt.elearning.entity;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import vn.fpt.elearning.enums.FillType;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "fill_correct")
@FieldNameConstants
@Accessors(chain = true)
@EqualsAndHashCode
public class FillCorrect {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Question question;
    @Column(columnDefinition = "TEXT", name = "answer")
    private String answer;
    private FillType type;
    @Column(name = "position_index")
    private Integer index;
}
