package vn.fpt.elearning.handler.forum.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.handler.IGetDetailFilterPagingHandler;
import vn.fpt.elearning.dtos.forum.category.request.CmsGetCategoryDetailPagingRequest;
import vn.fpt.elearning.dtos.forum.category.response.CategoryDetail;
import vn.fpt.elearning.entity.forum.ForumCategory;
import vn.fpt.elearning.mapper.forum.ForumCategoryMapper;
import vn.fpt.elearning.repository.forum.ForumCategoryRepository;

@Getter
@Component
@RequiredArgsConstructor
public class CmsGetCategoryDetailFilterPagingHandler implements IGetDetailFilterPagingHandler<String, CmsGetCategoryDetailPagingRequest, CategoryDetail, ForumCategory, ForumCategoryMapper> {

    private final ForumCategoryMapper mapper;
    private final ForumCategoryRepository repository;

    @Override
    public PageResponseData<CategoryDetail> handle(CmsGetCategoryDetailPagingRequest request) {
        String status = request.getStatus() != null ? request.getStatus().name() : null;
        return new PageResponseData<>(repository.findAllCategoryDetailPaging(
                request.getTitle(),
                request.getParentId(),
                status,
                request.getPageable()
        ));
    }
}
