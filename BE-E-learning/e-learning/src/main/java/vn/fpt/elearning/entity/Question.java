package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.QuestionType;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "question")
@FieldNameConstants
public class Question {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "question_no", nullable = false)
    private int questionNo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(name = "question_name", nullable = false, columnDefinition = "TEXT")
    private String questionName;

    @Column(name = "point", nullable = false)
    private float point;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType;
}
