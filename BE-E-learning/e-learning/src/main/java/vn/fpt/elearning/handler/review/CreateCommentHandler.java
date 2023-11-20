package vn.fpt.elearning.handler.review;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.review.request.CreateCommentRequest;
import vn.fpt.elearning.dtos.review.response.CommentResponse;
import vn.fpt.elearning.entity.Comment;
import vn.fpt.elearning.entity.Review;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICommentService;
import vn.fpt.elearning.service.interfaces.IReviewService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class CreateCommentHandler extends RequestHandler<CreateCommentRequest, CommentResponse> {
    private final IUserService userService;
    private final IReviewService reviewService;
    private final ICommentService commentService;
    @Override
    public CommentResponse handle(CreateCommentRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Review review = reviewService.getReviewByIdNotNull(request.getReviewId());
        Comment comment = new Comment()
            .setComment(request.getComment())
            .setUser(user)
            .setCourse(review.getCourse())
            .setReview(review);
        comment = commentService.save(comment);
        return new CommentResponse(comment, user.getId());
    }
}
