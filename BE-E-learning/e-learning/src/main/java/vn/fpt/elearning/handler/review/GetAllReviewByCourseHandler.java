package vn.fpt.elearning.handler.review;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.review.request.GetAllReviewByCourseRequest;
import vn.fpt.elearning.dtos.review.response.GetAllReviewByCourseResponse;
import vn.fpt.elearning.dtos.review.response.ReviewResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Review;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IReviewService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GetAllReviewByCourseHandler extends RequestHandler<GetAllReviewByCourseRequest, GetAllReviewByCourseResponse> {
    private final IReviewService reviewService;
    private final ICourseService courseService;
    @Override
    public GetAllReviewByCourseResponse handle(GetAllReviewByCourseRequest request) {
        // Ensure the course exists, or throw an exception
        Course course = courseService.getCourseByIdNotNull(request.getCourseId());
    
        // Retrieve reviews for the specified course
        Page<Review> page = reviewService.getAllByCourseId(request.getCourseId(), request.getPageable());
    
        // Convert the reviews to a list of ReviewResponse objects
        List<ReviewResponse> reviewResponses = page.getContent().stream()
                .map(review -> new ReviewResponse(review, request.getUserId()))
                .collect(Collectors.toList());
    
        // Create and return the response object
        return new GetAllReviewByCourseResponse(reviewResponses, new Paginate(page));
    }
    
}
