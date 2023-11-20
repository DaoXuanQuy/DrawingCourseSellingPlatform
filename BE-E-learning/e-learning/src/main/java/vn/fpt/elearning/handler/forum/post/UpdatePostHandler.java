package vn.fpt.elearning.handler.forum.post;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.handler.IUpdateModelHandler;
import vn.fpt.elearning.dtos.forum.post.request.UpdatePostRequest;
import vn.fpt.elearning.entity.forum.ForumPost;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.forum.ForumPostMapper;
import vn.fpt.elearning.repository.forum.ForumPostRepository;
import vn.fpt.elearning.exception.InternalException;

@Getter
@Component
@RequiredArgsConstructor
public class UpdatePostHandler implements IUpdateModelHandler<String, UpdatePostRequest, ForumPost, ForumPostMapper> {

    private final ForumPostRepository repository;
    private final ForumPostMapper mapper;

    @Override
    public void validate(ForumPost entity, UpdatePostRequest request) {
        if (entity.getCreatedBy() == null || !entity.getCreatedBy().equals(request.getUserId())) {
            throw new InternalException(ResponseCode.FORUM_POST_NOT_FOUND, "The forum post was not found or you don't have permission to update it.");
        }

        if (StringUtils.isBlank(request.getTitle())) {
            throw new InternalException(ResponseCode.INVALID_REQUEST, "Post title cannot be blank.");
        }

        if (StringUtils.length(request.getTitle()) > 255) {
            throw new InternalException(ResponseCode.INVALID_REQUEST, "Post title cannot exceed 255 characters.");
        }

        if (StringUtils.isBlank(request.getContent())) {
            throw new InternalException(ResponseCode.INVALID_REQUEST, "Post content cannot be blank.");
        }

        // Add more validation checks as needed...

        // If you reach here, validation passed.
    }

    @Override
    public InternalException notFound() {
        return new InternalException(ResponseCode.FORUM_POST_NOT_FOUND);
    }
}

