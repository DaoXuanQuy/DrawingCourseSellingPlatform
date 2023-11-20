package vn.fpt.elearning.handler.forum.topic;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.ICreateModelHandler;
import vn.fpt.elearning.dtos.forum.topic.request.CreateTopicRequest;
import vn.fpt.elearning.entity.forum.ForumCategory;
import vn.fpt.elearning.entity.forum.ForumPost;
import vn.fpt.elearning.entity.forum.ForumTopic;
import vn.fpt.elearning.mapper.forum.ForumTopicMapper;
import vn.fpt.elearning.repository.forum.ForumTopicRepository;
import vn.fpt.elearning.service.forum.ForumCategoryService;
import vn.fpt.elearning.service.forum.ForumPostService;

@Getter
@Component
@RequiredArgsConstructor
public class CreateTopicHandler implements ICreateModelHandler<Long, CreateTopicRequest, ForumTopic, ForumTopicMapper> {

    private final ForumTopicRepository repository;
    private final ForumTopicMapper mapper;
    private final ForumCategoryService categoryService;
    private final ForumPostService postService;

    @Override
    public void postMapping(ForumTopic entity, CreateTopicRequest request) {
        ForumCategory forumCategory = categoryService.findByIdNonNull(request.getCategoryId());
        ForumPost firstPost = new ForumPost()
                .setContent(request.getFirstPostContent())
                .setTopic(entity)
                .setOrdinal(1);
        entity.setCategory(forumCategory)
                .addPost(firstPost);
    }
}
