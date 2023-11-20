package vn.fpt.elearning.service.forum;

import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.forum.ForumTopic;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.forum.ForumTopicRepository;
import vn.fpt.elearning.service.BaseService;

@Service
public class ForumTopicService extends BaseService<Long, ForumTopic, ForumTopicRepository> {

    public ForumTopicService(ForumTopicRepository repository) {
        super(repository);
    }

    public ForumTopic getLatestPostByCategoryId(String categoryId) {
        return repository.getLatestPostByCategoryId(categoryId);
    }

    @Override
    protected ResponseCode notFound() {
        return ResponseCode.FORUM_TOPIC_NOT_FOUND;
    }
}
