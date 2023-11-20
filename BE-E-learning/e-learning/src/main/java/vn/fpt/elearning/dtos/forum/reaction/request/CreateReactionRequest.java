package vn.fpt.elearning.dtos.forum.reaction.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.forum.ForumReactionType;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CreateReactionRequest extends BaseRequestData {

    @Schema(example = "LIKE")
    @NotNull
    private ForumReactionType reactionType;
    private String postId;
}
