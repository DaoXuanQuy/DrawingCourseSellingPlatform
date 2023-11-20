package vn.fpt.elearning.handler.forum.reaction;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.handler.IGetInfoListFilterPagingHandler;
import vn.fpt.elearning.dtos.forum.reaction.request.GetReactionFilterPagingRequest;
import vn.fpt.elearning.dtos.forum.reaction.response.ReactionInfo;
import vn.fpt.elearning.entity.forum.ForumReaction;
import vn.fpt.elearning.mapper.forum.ForumReactionMapper;
import vn.fpt.elearning.repository.forum.ForumReactionRepository;

@Getter
@Component
@RequiredArgsConstructor
public class GetReactionFilterPagingHandler implements IGetInfoListFilterPagingHandler<ForumReaction.ReactionId, GetReactionFilterPagingRequest, ReactionInfo, ForumReaction, ForumReactionMapper> {

    private final ForumReactionRepository repository;
    private final ForumReactionMapper mapper;

    @Override
    public PageResponseData<ReactionInfo> handle(GetReactionFilterPagingRequest request) {
        return new PageResponseData<>(repository.findReactionFilterPaging(request, request.getPageable()));
    }
}
