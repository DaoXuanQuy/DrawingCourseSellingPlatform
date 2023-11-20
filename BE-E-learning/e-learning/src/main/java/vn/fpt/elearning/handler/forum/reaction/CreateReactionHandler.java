package vn.fpt.elearning.handler.forum.reaction;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.ICreateModelHandler;
import vn.fpt.elearning.dtos.forum.reaction.request.CreateReactionRequest;
import vn.fpt.elearning.entity.forum.ForumReaction;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.forum.ForumReactionMapper;
import vn.fpt.elearning.repository.forum.ForumReactionRepository;
import vn.fpt.elearning.exception.InternalException;

@Getter
@Component
@RequiredArgsConstructor
public class CreateReactionHandler implements ICreateModelHandler<ForumReaction.ReactionId, CreateReactionRequest, ForumReaction, ForumReactionMapper> {

    private final ForumReactionRepository repository;
    private final ForumReactionMapper mapper;

    @Override
    public CreateReactionRequest preHandle(CreateReactionRequest request) {
        if (repository.existsByPostIdAndUserIdAndReactionType(request.getPostId(), request.getUserId(), request.getReactionType())) {
            throw new InternalException(ResponseCode.FORUM_REACTION_EXISTED);
        }
        return request;
    }
}
