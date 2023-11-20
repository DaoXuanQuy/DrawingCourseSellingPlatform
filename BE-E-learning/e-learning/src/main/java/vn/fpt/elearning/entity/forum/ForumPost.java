package vn.fpt.elearning.entity.forum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.OnDeleteAction;
import vn.fpt.elearning.entity.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "forum_post")
@FieldNameConstants
@Accessors(chain = true)
public class ForumPost extends Auditable<String> {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "ordinal", nullable = false)
    private Integer ordinal;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ForumTopic.class)
    @JoinColumn(name = "topic_id")
    private ForumTopic topic;

    @OneToMany(mappedBy = "post", orphanRemoval = true)
    @Cascade({CascadeType.REMOVE})
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ForumReaction> reactions = new ArrayList<>();

}
