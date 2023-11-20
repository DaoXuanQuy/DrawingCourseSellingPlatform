package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.ReviewCourseRequest;
import vn.fpt.elearning.dtos.course.response.ReviewCourseResponse;
import vn.fpt.elearning.dtos.lesson.response.LessonResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Lesson;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.CourseStatus;
import vn.fpt.elearning.enums.DisplayStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.IExamService;
import vn.fpt.elearning.service.interfaces.ILessonService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ReviewCourseHandler extends RequestHandler<ReviewCourseRequest, ReviewCourseResponse> {

    private final ICourseService courseService;
    private final ILessonService lessonService;
    private final IExamService examService;

    @Override
    public ReviewCourseResponse handle(ReviewCourseRequest request) {
        Course course = courseService.getCourseById(request.getId());
        if (course == null || CourseStatus.INACTIVE.equals(course.getStatus()) || !ApproveStatus.APPROVE.equals(course.getApproveStatus())) {
            throw new InternalException(ResponseCode.COURSE_INVALID);
        }
        List<Lesson> lessons = lessonService.getLessonByCourseIdAndStatus(course.getId(), DisplayStatus.VISIBLE);
        List<LessonResponse> lessonResponses = lessons.stream().map(LessonResponse::new).collect(Collectors.toList());
        ReviewCourseResponse response = new ReviewCourseResponse(course);
        response.setLessons(lessonResponses);
        response.setExamsCount(examService.countByCourse(course.getId()));
        return response;
    }
}
