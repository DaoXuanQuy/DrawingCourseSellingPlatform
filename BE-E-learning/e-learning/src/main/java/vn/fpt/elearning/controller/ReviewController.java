package vn.fpt.elearning.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.review.request.*;
import vn.fpt.elearning.dtos.review.response.CommentResponse;
import vn.fpt.elearning.dtos.review.response.DeleteReviewResponse;
import vn.fpt.elearning.dtos.review.response.GetAllReviewByCourseResponse;
import vn.fpt.elearning.dtos.review.response.ReviewResponse;
import vn.fpt.elearning.controller.interfaces.IReviewController;


@RestController
public class ReviewController extends BaseController implements IReviewController {
    @Override
    public ResponseEntity<ResponseBase<ReviewResponse>> createReview(CreateReviewRequest request) {
        return this.execute(request, ReviewResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<ReviewResponse>> updateReview(UpdateReviewRequest request) {
        return this.execute(request, ReviewResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<DeleteReviewResponse>> deleteReview(DeleteReviewRequest request) {
        return this.execute(request, DeleteReviewResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<CommentResponse>> createComment(CreateCommentRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<CommentResponse>> updateComment(UpdateCommentRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteComment(DeleteCommentRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetAllReviewByCourseResponse>> getAllReviewByCourse(String id, Pageable pageable) {
        GetAllReviewByCourseRequest request = new GetAllReviewByCourseRequest(id);
        request.setPageable(pageable);
        return this.execute(request);
    }
}
