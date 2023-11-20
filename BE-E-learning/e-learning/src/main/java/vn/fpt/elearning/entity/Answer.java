package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "answer")
@FieldNameConstants
@Accessors(chain = true)
public class Answer extends Auditable<String> {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Question question;

    @Column(columnDefinition = "TEXT", name = "fill_answer")
    private String fillAnswer;

    @OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    private Set<FillAnswer> fillAnswers;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Option> options;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private User user;

}
