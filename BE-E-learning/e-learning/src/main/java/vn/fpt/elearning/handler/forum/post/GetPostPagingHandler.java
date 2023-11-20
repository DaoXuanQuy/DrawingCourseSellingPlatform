package vn.fpt.elearning.handler.forum.post;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.handler.IGetInfoListFilterPagingHandler;
import vn.fpt.elearning.dtos.forum.post.request.GetPostPagingRequest;
import vn.fpt.elearning.dtos.forum.post.response.PostInfo;
import vn.fpt.elearning.dtos.forum.post.response.PostInfoResult;
import vn.fpt.elearning.entity.forum.ForumPost;
import vn.fpt.elearning.mapper.forum.ForumPostMapper;
import vn.fpt.elearning.repository.forum.ForumPostRepository;
import vn.fpt.elearning.service.interfaces.IUserService;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Component
@RequiredArgsConstructor
public class GetPostPagingHandler implements IGetInfoListFilterPagingHandler<String, GetPostPagingRequest, PostInfo, ForumPost, ForumPostMapper> {

    private final ForumPostRepository repository;
    private final ForumPostMapper mapper;
    private final IUserService iUserService;

    @Override
    public PageResponseData<PostInfo> handle(GetPostPagingRequest request) {
        Page<PostInfoResult> pages = repository.findPostFilterPaging(request.getTopicId(), request.getUserId(), request.getPageable());
        List<PostInfo> postInfos = pages.stream().map(PostInfo::create).collect(Collectors.toList());
        return new PageResponseData<>(postInfos, pages);
    }
}
