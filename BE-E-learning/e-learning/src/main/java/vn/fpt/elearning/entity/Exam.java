package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.ExamStatus;
import vn.fpt.elearning.enums.ExamType;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "exam")
@FieldNameConstants
public class Exam extends Auditable<String>{
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(nullable = false)
    private String examName;

    @Column(nullable = false)
    private int timeMinute;

    private int testAttempts = 1;

    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Lesson lesson;

    @Enumerated(EnumType.STRING)
    private ExamStatus status;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "exam")
    private List<Question> questions;

}
