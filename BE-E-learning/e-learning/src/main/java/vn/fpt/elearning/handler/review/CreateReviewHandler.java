package vn.fpt.elearning.handler.review;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.review.request.CreateReviewRequest;
import vn.fpt.elearning.dtos.review.response.ReviewResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Review;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IReviewService;
import vn.fpt.elearning.service.interfaces.IUserService;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class CreateReviewHandler extends RequestHandler<CreateReviewRequest, ReviewResponse> {
    private final IUserService userService;
    private final ICourseService courseService;
    private final IReviewService reviewService;

    @Override
    public ReviewResponse handle(CreateReviewRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Course course = courseService.getCourseById(request.getCourseId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        Set<User> courseUsers = course.getUsers();
        if (courseUsers == null || !courseUsers.contains(user)) {
            throw new InternalException(ResponseCode.USER_INVALID);
        }
        if (reviewService.getReviewByUserIdAndCourseId(user.getId(), course.getId()) != null) {
            throw new InternalException(ResponseCode.REVIEW_EXISTED);
        }
        Review review = new Review();
        review.setUser(user);
        review.setCourse(course);
        review.setSubject(request.getSubject());
        review.setContent(request.getContent());
        review.setStar(request.getStar());
        review = reviewService.save(review);
        return new ReviewResponse(review, user.getId());
    }
}
