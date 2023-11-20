package vn.fpt.elearning.service.forum;

import lombok.Getter;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.forum.ForumPost;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.forum.ForumPostRepository;
import vn.fpt.elearning.service.BaseService;

@Getter
@Service
public class ForumPostService extends BaseService<String, ForumPost, ForumPostRepository> {

    private final ForumPostRepository repository;

    public ForumPostService(ForumPostRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    protected ResponseCode notFound() {
        return ResponseCode.FORUM_POST_NOT_FOUND;
    }
}
