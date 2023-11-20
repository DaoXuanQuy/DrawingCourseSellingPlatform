package vn.fpt.elearning.handler.forum.reaction;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IUpdateModelHandler;
import vn.fpt.elearning.dtos.forum.reaction.request.UpdateReactionRequest;
import vn.fpt.elearning.entity.forum.ForumReaction;
import vn.fpt.elearning.mapper.forum.ForumReactionMapper;
import vn.fpt.elearning.repository.forum.ForumReactionRepository;

@Getter
@Component
@RequiredArgsConstructor
public class UpdateReactionHandler implements IUpdateModelHandler<ForumReaction.ReactionId, UpdateReactionRequest, ForumReaction, ForumReactionMapper> {

    private final ForumReactionRepository repository;
    private final ForumReactionMapper mapper;
}
