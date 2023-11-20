package vn.fpt.elearning.handler.forum.reaction;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IDeleteModelHandler;
import vn.fpt.elearning.dtos.forum.reaction.request.DeleteReactionRequest;
import vn.fpt.elearning.entity.forum.ForumReaction;
import vn.fpt.elearning.repository.forum.ForumReactionRepository;

@Getter
@Component
@RequiredArgsConstructor
public class DeleteReactionHandler implements IDeleteModelHandler<ForumReaction.ReactionId, DeleteReactionRequest, ForumReaction> {

    private final ForumReactionRepository repository;
}
