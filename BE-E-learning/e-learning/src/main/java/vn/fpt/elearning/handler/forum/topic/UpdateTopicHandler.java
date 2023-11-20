package vn.fpt.elearning.handler.forum.topic;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IUpdateModelHandler;
import vn.fpt.elearning.dtos.forum.topic.request.UpdateTopicRequest;
import vn.fpt.elearning.entity.forum.ForumTopic;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.forum.ForumTopicMapper;
import vn.fpt.elearning.repository.forum.ForumTopicRepository;
import vn.fpt.elearning.exception.InternalException;

@Getter
@Component
@RequiredArgsConstructor
public class UpdateTopicHandler implements IUpdateModelHandler<Long, UpdateTopicRequest, ForumTopic, ForumTopicMapper> {

    private final ForumTopicRepository repository;
    private final ForumTopicMapper mapper;

    @Override
    public void validate(ForumTopic entity, UpdateTopicRequest request) {
        if (!entity.getCreatedBy().equals(request.getUserId())) {
            throw notFound();
        }
    }

    @Override
    public InternalException notFound() {
        return new InternalException(ResponseCode.FORUM_TOPIC_NOT_FOUND);
    }
}
