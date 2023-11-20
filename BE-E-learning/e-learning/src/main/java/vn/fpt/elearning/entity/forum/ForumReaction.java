package vn.fpt.elearning.entity.forum;

import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.forum.ForumReactionType;
import vn.fpt.elearning.entity.Auditable;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "forum_reaction")
@FieldNameConstants
@Accessors(chain = true)
@IdClass(ForumReaction.ReactionId.class)
public class ForumReaction extends Auditable<String> {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Id
    @Column(name = "post_id")
    private String postId;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(insertable = false, updatable = false)
    private User user;

    @MapsId("postId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(insertable = false, updatable = false)
    private ForumPost post;

    @Column(name = "reaction_type")
    @Enumerated(EnumType.STRING)
    private ForumReactionType reactionType;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    @Embeddable
    public static class ReactionId implements Serializable {

        private static final long serialVersionUID = 4L;

        private String userId;
        private String postId;
    }
}
