package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.ExamResultStatus;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "exam_result")
@FieldNameConstants
@Accessors(chain = true)
public class ExamResult extends Auditable<String> {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    private String code;

    @ManyToOne()
    @JoinColumn(nullable = false)
    private Exam exam;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private User user;

    private Double score;

    private Integer correctTotal;

    private LocalDateTime time;
    @Enumerated(EnumType.STRING)
    private ExamResultStatus status;

    @Column(columnDefinition = "TEXT")
    private String comment;
}
