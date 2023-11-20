package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.dtos.course.response.CmsGetDetailCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.PaymentType;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.service.course.CourseRegisterStrategy;

public interface ICourseService {
    Page<Course> getListCourses(Specification<Course> specification, Pageable pageable);

    Course getCourseById(String id);

    Course getCourseByIdNotNull(String id);

    Course save(Course course);

    Course updateCourse(Course course);

    void deleteCourseById(String id);

    Page<CourseDto> getCourseByUser(User user, Pageable pageable);
    Page<CourseDto> getUnregisterCourseByUser(User user, Pageable pageable);

    CmsGetDetailCourseResponse getDetailByTeacher(String id);

    Course getByTeacherOrUser(String courseId, String userId);

    Course getCourseByExamId(String examId);

    CourseRegisterStrategy getRegisterStrategy(PaymentType paymentType);
}
