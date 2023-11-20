package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.review.request.*;
import vn.fpt.elearning.dtos.review.response.CommentResponse;
import vn.fpt.elearning.dtos.review.response.DeleteReviewResponse;
import vn.fpt.elearning.dtos.review.response.GetAllReviewByCourseResponse;
import vn.fpt.elearning.dtos.review.response.ReviewResponse;


import javax.validation.Valid;

@RequestMapping("/api/review")
@Tag(name = "Review controller", description = "Review controller")
public interface IReviewController {
    @PostMapping("/v1/create")
    @Operation(
        summary = "Tạo đánh giá",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<ReviewResponse>> createReview(@RequestBody @Valid CreateReviewRequest request);

    @PutMapping("/v1/update")
    @Operation(
        summary = "Chỉnh sửa đánh giá",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<ReviewResponse>> updateReview(@RequestBody @Valid UpdateReviewRequest request);

    @DeleteMapping("/v1/delete")
    @Operation(
        summary = "Xóa đánh giá",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<DeleteReviewResponse>> deleteReview(@RequestBody @Valid DeleteReviewRequest request);

    @Operation(
        summary = "Tạo bình luận về bài nhận xét khóa học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/v1/comment/create")
    ResponseEntity<ResponseBase<CommentResponse>> createComment(@RequestBody @Valid CreateCommentRequest request);

    @Operation(
        summary = "Chỉnh sửa bình luận về bài nhận xét khóa học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/v1/comment/update")
    ResponseEntity<ResponseBase<CommentResponse>> updateComment(@RequestBody @Valid UpdateCommentRequest request);

    @Operation(
        summary = "Xóa bình luận về bài nhận xét khóa học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @DeleteMapping("/v1/comment/delete")
    ResponseEntity<ResponseBase<StatusResponse>> deleteComment(@RequestBody @Valid DeleteCommentRequest request);

    @Operation(
        summary = "Lấy danh sách đánh giá theo khóa học"
    )
    @GetMapping("/public/v1/course/{id}")
    ResponseEntity<ResponseBase<GetAllReviewByCourseResponse>> getAllReviewByCourse(@PathVariable String id, @ParameterObject Pageable pageable);
}
