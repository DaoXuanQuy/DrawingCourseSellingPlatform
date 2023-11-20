package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.CourseStatus;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "course")
@FieldNameConstants
@Accessors(chain = true)
public class Course extends Auditable<String>{
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(nullable = false)
    private String courseName;

    @Column(columnDefinition = "TEXT", name = "description")
    private String description;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long price;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = true)
    private Teacher teacher;

    @Enumerated(EnumType.STRING)
    private CourseStatus status;

    @Enumerated(EnumType.STRING)
    private ApproveStatus approveStatus;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "course_user",
        joinColumns = {@JoinColumn(name = "course_id", nullable = false, updatable = false)},
        inverseJoinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)}
    )
    private Set<User> users = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "course", orphanRemoval = true)
    private List<Lesson> lessons;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "course", orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "course", orphanRemoval = true)
    private List<Invoice> invoices;

    private Integer discountPercentage = 0;
}
