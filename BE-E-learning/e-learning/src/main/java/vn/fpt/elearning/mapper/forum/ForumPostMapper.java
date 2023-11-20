package vn.fpt.elearning.mapper.forum;

import org.mapstruct.*;
import vn.fpt.elearning.core.converter.FromCreateRequestToEntity;
import vn.fpt.elearning.core.converter.FromEntityPageToInfoPage;
import vn.fpt.elearning.core.converter.FromUpdateRequestToEntity;
import vn.fpt.elearning.dtos.forum.post.request.CreatePostRequest;
import vn.fpt.elearning.dtos.forum.post.request.UpdatePostRequest;
import vn.fpt.elearning.dtos.forum.post.response.PostInfo;
import vn.fpt.elearning.entity.forum.ForumPost;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ForumPostMapper extends
        FromCreateRequestToEntity<CreatePostRequest, ForumPost>,
        FromUpdateRequestToEntity<UpdatePostRequest, ForumPost>,
        FromEntityPageToInfoPage<PostInfo, ForumPost> {

    @Override
    @Named("fromEntityToInfoFilterPageMapper")
    @Mapping(source = "topic.id", target = "topicId")
    PostInfo fromEntityToInfoFilterPage(ForumPost entity);
}
