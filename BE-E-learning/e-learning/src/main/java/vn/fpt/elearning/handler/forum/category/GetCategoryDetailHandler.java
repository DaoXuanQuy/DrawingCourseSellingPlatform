package vn.fpt.elearning.handler.forum.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IGetDetailModelByIdHandler;
import vn.fpt.elearning.dtos.forum.category.request.GetCategoryDetailRequest;
import vn.fpt.elearning.dtos.forum.category.response.CategoryDetail;
import vn.fpt.elearning.entity.forum.ForumCategory;
import vn.fpt.elearning.mapper.forum.ForumCategoryMapper;
import vn.fpt.elearning.repository.forum.ForumCategoryRepository;

@Getter
@Component
@RequiredArgsConstructor
public class GetCategoryDetailHandler implements IGetDetailModelByIdHandler<String, GetCategoryDetailRequest, CategoryDetail, ForumCategory, ForumCategoryMapper> {

    private final ForumCategoryRepository repository;
    private final ForumCategoryMapper mapper;
}
