package vn.fpt.elearning.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.fpt.elearning.entity.Review;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, String> {
    Page<Review> findAllByCourseId(String courseId, Pageable pageable);
    Optional<Review> findByCourseIdAndUserId(String courseId, String userId);
}
