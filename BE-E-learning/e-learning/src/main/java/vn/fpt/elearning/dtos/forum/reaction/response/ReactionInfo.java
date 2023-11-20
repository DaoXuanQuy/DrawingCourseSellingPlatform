package vn.fpt.elearning.dtos.forum.reaction.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.enums.forum.ForumReactionType;

@Getter
@Setter
@NoArgsConstructor
public class ReactionInfo extends BaseResponseData {

    private String postId;
    private String userId;
    private String firstName;
    private String lastName;
    private ForumReactionType type;

    public ReactionInfo(String postId, String userId, String firstName, String lastName, ForumReactionType type) {
        this.postId = postId;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
    }
}
