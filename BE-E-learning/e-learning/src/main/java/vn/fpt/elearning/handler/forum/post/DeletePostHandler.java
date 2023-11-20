package vn.fpt.elearning.handler.forum.post;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IDeleteModelHandler;
import vn.fpt.elearning.dtos.forum.post.request.DeletePostRequest;
import vn.fpt.elearning.entity.forum.ForumPost;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.forum.ForumPostRepository;
import vn.fpt.elearning.exception.InternalException;

@Getter
@Component
@RequiredArgsConstructor
public class DeletePostHandler implements IDeleteModelHandler<String, DeletePostRequest, ForumPost> {

    private final ForumPostRepository repository;

    @Override
    public void validate(ForumPost entity, DeletePostRequest request) {
        if (!entity.getCreatedBy().equals(request.getUserId())) {
            throw notFound();
        }
    }

    @Override
    public InternalException notFound() {
        return new InternalException(ResponseCode.FORUM_POST_NOT_FOUND);
    }
}
