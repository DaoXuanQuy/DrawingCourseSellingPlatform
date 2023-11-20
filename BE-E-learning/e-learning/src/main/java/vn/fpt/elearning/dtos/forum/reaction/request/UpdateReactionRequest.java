package vn.fpt.elearning.dtos.forum.reaction.request;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestId;
import vn.fpt.elearning.entity.forum.ForumReaction;
import vn.fpt.elearning.enums.forum.ForumReactionType;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UpdateReactionRequest extends BaseRequestId<String> {

    @NotNull
    private ForumReactionType reactionType;

    @Override
    public <T> T convertedId() {
        return (T) new ForumReaction.ReactionId(getUserId(), getId());
    }
}
