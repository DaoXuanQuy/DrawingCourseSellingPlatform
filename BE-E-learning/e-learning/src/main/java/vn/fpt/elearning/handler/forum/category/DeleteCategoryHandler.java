package vn.fpt.elearning.handler.forum.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IDeleteModelHandler;
import vn.fpt.elearning.dtos.forum.category.request.DeleteCategoryRequest;
import vn.fpt.elearning.entity.forum.ForumCategory;
import vn.fpt.elearning.repository.forum.ForumCategoryRepository;

@Getter
@Component
@RequiredArgsConstructor
public class DeleteCategoryHandler implements IDeleteModelHandler<String, DeleteCategoryRequest, ForumCategory> {

    private final ForumCategoryRepository repository;
}
