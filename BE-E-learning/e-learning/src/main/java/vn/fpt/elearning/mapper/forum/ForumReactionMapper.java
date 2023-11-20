package vn.fpt.elearning.mapper.forum;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import vn.fpt.elearning.core.converter.FromCreateRequestToEntity;
import vn.fpt.elearning.core.converter.FromEntityPageToInfoPage;
import vn.fpt.elearning.core.converter.FromUpdateRequestToEntity;
import vn.fpt.elearning.dtos.forum.reaction.request.CreateReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.request.UpdateReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.response.ReactionInfo;
import vn.fpt.elearning.entity.forum.ForumReaction;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ForumReactionMapper extends
        FromCreateRequestToEntity<CreateReactionRequest, ForumReaction>,
        FromUpdateRequestToEntity<UpdateReactionRequest, ForumReaction>,
        FromEntityPageToInfoPage<ReactionInfo, ForumReaction> {
}
