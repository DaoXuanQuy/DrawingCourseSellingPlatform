package vn.fpt.elearning.handler.review;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.review.request.DeleteReviewRequest;
import vn.fpt.elearning.dtos.review.response.DeleteReviewResponse;
import vn.fpt.elearning.entity.Review;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IReviewService;
import vn.fpt.elearning.service.interfaces.IUserService;

@Component
@RequiredArgsConstructor
public class DeleteReviewHandler extends RequestHandler<DeleteReviewRequest, DeleteReviewResponse> {
    private final IReviewService reviewService;
    private final IUserService userService;

    @Override
    public DeleteReviewResponse handle(DeleteReviewRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Review review = reviewService.getReviewByIdNotNull(request.getId());
        if (!StringUtils.equals(user.getId(), review.getUser().getId())) {
            throw new InternalException(ResponseCode.USER_INVALID);
        }
        reviewService.deleteReview(request.getId());
        return new DeleteReviewResponse(true);
    }
}
