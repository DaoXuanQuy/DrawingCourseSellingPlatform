package vn.fpt.elearning.handler.forum.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.ICreateModelHandler;
import vn.fpt.elearning.dtos.forum.category.request.CreateCategoryRequest;
import vn.fpt.elearning.entity.forum.ForumCategory;
import vn.fpt.elearning.mapper.forum.ForumCategoryMapper;
import vn.fpt.elearning.repository.forum.ForumCategoryRepository;

@Getter
@Component
@RequiredArgsConstructor
public class CreateCategoryHandler implements ICreateModelHandler<String, CreateCategoryRequest, ForumCategory, ForumCategoryMapper> {

    private final ForumCategoryRepository repository;
    private final ForumCategoryMapper mapper;

    @Override
    public void postMapping(ForumCategory entity, CreateCategoryRequest request) {
        if (request.getParentId() != null) {
            ForumCategory forumCategory = repository.findById(request.getParentId()).orElse(null);
            entity.setParentCategory(forumCategory);
        }
    }
}
