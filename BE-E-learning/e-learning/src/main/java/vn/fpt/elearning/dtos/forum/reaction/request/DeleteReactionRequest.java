package vn.fpt.elearning.dtos.forum.reaction.request;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestId;
import vn.fpt.elearning.entity.forum.ForumReaction;

@Getter
@Setter
public class DeleteReactionRequest extends BaseRequestId<String> {

    @Override
    public <T> T convertedId() {
        return (T) new ForumReaction.ReactionId(getUserId(), getId());
    }
}
