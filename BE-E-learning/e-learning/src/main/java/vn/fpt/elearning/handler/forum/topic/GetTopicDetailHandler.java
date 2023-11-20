package vn.fpt.elearning.handler.forum.topic;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IGetDetailModelByIdHandler;
import vn.fpt.elearning.dtos.forum.UserForum;
import vn.fpt.elearning.dtos.forum.topic.request.GetTopicDetailRequest;
import vn.fpt.elearning.dtos.forum.topic.response.TopicInfo;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.entity.forum.ForumTopic;
import vn.fpt.elearning.mapper.forum.ForumTopicMapper;
import vn.fpt.elearning.repository.forum.ForumTopicRepository;
import vn.fpt.elearning.service.interfaces.IUserService;

@Getter
@Component
@RequiredArgsConstructor
public class GetTopicDetailHandler implements IGetDetailModelByIdHandler<Long, GetTopicDetailRequest, TopicInfo, ForumTopic, ForumTopicMapper> {

    private final ForumTopicRepository repository;
    private final ForumTopicMapper mapper;
    private final IUserService iUserService;

    @Override
    public void postMapping(ForumTopic entity, TopicInfo response) {
        User user = iUserService.getUserById(response.getCreatedBy());
        if (user != null) {
            response.setUser(new UserForum(user.getAvatar(), user.getFirstName(), user.getLastName()));
        }
    }
}
