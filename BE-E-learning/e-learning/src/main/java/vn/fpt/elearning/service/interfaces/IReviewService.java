package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.fpt.elearning.entity.Review;

public interface IReviewService {
    Review save(Review review);

    Review getReviewById(String id);

    Review getReviewByIdNotNull(String id);

    void deleteReview(String id);

    Page<Review> getAllByCourseId(String courseId, Pageable pageable);
    Review getReviewByUserIdAndCourseId(String userId, String courseId);
}
