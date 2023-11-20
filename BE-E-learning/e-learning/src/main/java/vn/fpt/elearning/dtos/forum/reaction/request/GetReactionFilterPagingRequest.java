package vn.fpt.elearning.dtos.forum.reaction.request;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.forum.ForumReactionType;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class GetReactionFilterPagingRequest extends BaseRequestData {

    @NotBlank
    private String postId;

    private ForumReactionType reactionType;
}
