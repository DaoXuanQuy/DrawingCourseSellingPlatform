package vn.fpt.elearning.entity.forum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.*;
import vn.fpt.elearning.enums.forum.ForumTopicStatus;
import vn.fpt.elearning.entity.Auditable;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "forum_topic")
@FieldNameConstants
@Accessors(chain = true)
public class ForumTopic extends Auditable<String> {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", columnDefinition = "VARCHAR(1000)", nullable = false)
    private String title;

    @Column(name = "tags", columnDefinition = "TEXT")
    private String tags;

//    @Column(name = "path", nullable = false)
//    private String path;

    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'ACTIVE'")
    @Enumerated(EnumType.STRING)
    private ForumTopicStatus status = ForumTopicStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ForumCategory.class)
    @JoinColumn(name = "category_id")
    private ForumCategory category;

    @OneToMany(mappedBy = "topic", cascade = javax.persistence.CascadeType.ALL, orphanRemoval = true, targetEntity = ForumPost.class)
    @Cascade({CascadeType.ALL, CascadeType.SAVE_UPDATE})
    @Fetch(FetchMode.SUBSELECT)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ForumPost> posts = new ArrayList<>();

    public ForumTopic addPost(ForumPost post) {
        this.posts.add(post);
        return this;
    }
}
