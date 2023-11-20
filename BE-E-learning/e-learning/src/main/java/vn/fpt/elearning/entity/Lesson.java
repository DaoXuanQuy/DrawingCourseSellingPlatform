package vn.fpt.elearning.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.DisplayStatus;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lesson")
@Accessors(chain = true)
public class Lesson extends Auditable<String> {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @Column(columnDefinition = "TEXT", name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    private DisplayStatus displayStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false)
    private Course course;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "lesson", orphanRemoval = true)
    @JsonIgnore
    private List<Document> documents;

}
