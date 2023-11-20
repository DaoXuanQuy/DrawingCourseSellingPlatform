package vn.fpt.elearning.dtos.forum.post.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import vn.fpt.elearning.core.BaseResponseAudit;
import vn.fpt.elearning.dtos.forum.UserForum;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class PostInfo extends BaseResponseAudit<String> {

    private String id;
    private String content;
    private Integer ordinal;
    private Long topicId;
    private UserForum user;
    private Long like;
    private Long dislike;
    private Integer currentUserReactionType;

    public static PostInfo create(PostInfoResult result) {
        PostInfo postInfo =  new PostInfo()
                .setId(result.getId())
                .setContent(result.getContent())
                .setOrdinal(result.getOrdinal())
                .setTopicId(result.getTopicId())
                .setUser(new UserForum(result.getAvatar(), result.getFirstName(), result.getLastName()))
                .setLike(result.getLike())
                .setDislike(result.getDislike())
                .setCurrentUserReactionType(result.getCurrentUserReactionType());
        postInfo.setCreateDate(result.getCreateDate());
        postInfo.setCreatedBy(result.getCreatedBy());
        postInfo.setLastModifiedBy(result.getLastModifiedBy());
        postInfo.setLastModifiedDate(result.getLastModifiedDate());
        return postInfo;
    }

    public PostInfo(String id,
                    String createdBy,
                    LocalDateTime createDate,
                    String lastModifiedBy,
                    LocalDateTime lastModifiedDate,
                    String content,
                    Integer ordinal,
                    Long topicId,
                    String avatar,
                    String firstName,
                    String lastName,
                    Long like,
                    Long dislike,
                    Integer currentUserReactionType
    ) {
        this.id = id;
        setCreatedBy(createdBy);
        setCreateDate(createDate);
        setLastModifiedBy(lastModifiedBy);
        setLastModifiedDate(lastModifiedDate);
        this.content = content;
        this.ordinal = ordinal;
        this.topicId = topicId;
        this.user = new UserForum(avatar, firstName, lastName);
        this.like = Objects.requireNonNullElse(like, 0L);
        this.dislike = Objects.requireNonNullElse(dislike, 0L);
        this.currentUserReactionType = Objects.requireNonNullElse(currentUserReactionType, 0);
    }
}
