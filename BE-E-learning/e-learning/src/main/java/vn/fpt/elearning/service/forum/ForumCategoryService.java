package vn.fpt.elearning.service.forum;

import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.forum.ForumCategory;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.forum.ForumCategoryRepository;
import vn.fpt.elearning.service.BaseService;

@Component
public class ForumCategoryService extends BaseService<String, ForumCategory, ForumCategoryRepository> {

    public ForumCategoryService(ForumCategoryRepository repository) {
        super(repository);
    }

    @Override
    protected ResponseCode notFound() {
        return ResponseCode.FORUM_CATEGORY_NOT_FOUND;
    }
}
