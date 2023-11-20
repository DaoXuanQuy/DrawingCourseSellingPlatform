package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import vn.fpt.elearning.enums.Gender;
import vn.fpt.elearning.entity.forum.ForumReaction;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_data")
@FieldNameConstants
@Accessors(chain = true)
public class User extends Auditable<String> {
    @Id
    private String id;

    private String firstName;

    private String lastName;

    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne(fetch = FetchType.LAZY)
    private Province province;

    @ManyToOne(fetch = FetchType.LAZY)
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    private Ward ward;

    private String streetName;

    private int homeNumber;

    @Column(unique = true, nullable = false, updatable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String phone;

    private boolean active;

    private String avatar;

    private Boolean ban;

    @Column(name = "deleted")
    private Boolean delete;

    private Boolean isOrc;

    private Boolean isOnline;

    private String sessionId;

    @OneToOne(fetch = FetchType.LAZY)
    private Teacher teacher;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "users")
    private Set<Course> courses;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "user")
    private List<ExamResult> examResultEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "user")
    private List<Review> reviews;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, mappedBy = "user")
    private List<Invoice> invoices;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ForumReaction> reactions = new ArrayList<>();
}
