package vn.fpt.elearning.handler.forum.topic;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IDeleteModelHandler;
import vn.fpt.elearning.dtos.forum.topic.request.DeleteTopicRequest;
import vn.fpt.elearning.entity.forum.ForumTopic;
import vn.fpt.elearning.repository.forum.ForumTopicRepository;

@Getter
@Component
@RequiredArgsConstructor
public class DeleteTopicHandler implements IDeleteModelHandler<Long, DeleteTopicRequest, ForumTopic> {

    private final ForumTopicRepository repository;

    @Override
    public void validate(ForumTopic entity, DeleteTopicRequest request) {
        if (!entity.getCreatedBy().equals(request.getUserId())) {
            throw notFound();
        }
    }

}
