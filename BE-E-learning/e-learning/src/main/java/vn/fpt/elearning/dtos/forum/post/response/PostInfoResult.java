package vn.fpt.elearning.dtos.forum.post.response;

import java.time.LocalDateTime;

public interface PostInfoResult {
    String getId();

    String getContent();

    Integer getOrdinal();

    String getCreatedBy();

    String getLastModifiedBy();

    LocalDateTime getCreateDate();

    LocalDateTime getLastModifiedDate();

    Long getTopicId();

    Long getLike();

    Long getDislike();

    Integer getCurrentUserReactionType();

    String getAvatar();

    String getFirstName();

    String getLastName();

}
