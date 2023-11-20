package vn.fpt.elearning.handler.review;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.review.request.DeleteCommentRequest;
import vn.fpt.elearning.entity.Comment;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICommentService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class DeleteCommentHandler extends RequestHandler<DeleteCommentRequest, StatusResponse> {
    private final ICommentService commentService;
    private final IUserService userService;
    @Override
    public StatusResponse handle(DeleteCommentRequest request) {
        User user = userService.getUserByIdNotNull(request.getUserId());
        Comment comment = commentService.getByIdNotNull(request.getId());
        if (!StringUtils.equals(user.getId(), comment.getUser().getId())) {
            throw new InternalException(ResponseCode.USER_INVALID);
        }
        commentService.deleteById(request.getId());
        return new StatusResponse(true);
    }
}
