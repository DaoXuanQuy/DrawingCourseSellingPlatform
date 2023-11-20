package vn.fpt.elearning.handler.forum.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.BaseResponseList;
import vn.fpt.elearning.core.handler.IGetInfoListFilterHandler;
import vn.fpt.elearning.dtos.forum.category.request.GetCategoryListRequest;
import vn.fpt.elearning.dtos.forum.category.response.CategoryInfo;
import vn.fpt.elearning.entity.forum.ForumCategory;
import vn.fpt.elearning.entity.forum.ForumTopic;
import vn.fpt.elearning.mapper.forum.ForumCategoryMapper;
import vn.fpt.elearning.mapper.forum.ForumTopicMapper;
import vn.fpt.elearning.repository.forum.ForumCategoryRepository;
import vn.fpt.elearning.service.forum.ForumTopicService;

import java.util.List;

@Getter
@Component
@RequiredArgsConstructor
public class GetCategoryListFilterHandler implements IGetInfoListFilterHandler<String, GetCategoryListRequest, CategoryInfo, ForumCategory, ForumCategoryMapper> {

    private final ForumCategoryRepository repository;
    private final ForumCategoryMapper mapper;
    private final ForumTopicService topicService;
    private final ForumTopicMapper forumTopicMapper;


    @Override
    public BaseResponseList<CategoryInfo> handle(GetCategoryListRequest request) {
        List<CategoryInfo> categoryInfoList = repository.findAllList();
        for (CategoryInfo category : categoryInfoList) {
            ForumTopic latestTopic = topicService.getLatestPostByCategoryId(category.getId());
            category.setLatestTopicInfo(forumTopicMapper.fromEntityToInfo(latestTopic));
        }
        return new BaseResponseList<>(categoryInfoList);
    }
}
