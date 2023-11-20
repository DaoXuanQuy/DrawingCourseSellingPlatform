package vn.fpt.elearning.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.fpt.elearning.dtos.course.response.CmsGetDetailCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.model.course.CourseDto;

import java.util.Optional;
import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, String>, JpaSpecificationExecutor<Course> {

    @Query("SELECT new course.model.vn.fpt.elearning.CourseDto(" +
            "c.id, c.courseName, c.description, c.price, c.imageUrl, c.status, c.approveStatus, c.createDate, " +
            "t.id, CONCAT(ut.firstName, ' ', ut.lastName), COUNT(u.id), c.discountPercentage, " +
            "c.price * (100 - c.discountPercentage) / 100, 0, COALESCE(avg(r.star), 0)) " +
            "FROM Course c " +
            "LEFT JOIN Teacher t ON c.teacher.id = t.id " +
            "LEFT JOIN User ut ON t.user.id = ut.id " +
            "LEFT JOIN Review r ON r.course.id = c.id " +
            "LEFT JOIN c.users u " +
            "WHERE c.status = 'ACTIVE' AND c.approveStatus = 'APPROVE' AND " +
            "c.id NOT IN (SELECT c1.id FROM Course c1 INNER JOIN c1.users u1 WHERE u1.id = :userId) " +
            "GROUP BY c.id, t.id, ut.firstName, ut.lastName, ut.id")
    Page<CourseDto> findCourseUserNotRegister(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT new course.model.vn.fpt.elearning.CourseDto(" +
            "c.id, c.courseName, c.description, c.price, c.imageUrl, c.status, c.approveStatus, c.createDate, " +
            "t.id, CONCAT(ut.firstName, ' ', ut.lastName), COUNT(u.id), c.discountPercentage, " +
            "c.price * (100 - c.discountPercentage) / 100, 0 , COALESCE(avg(r.star), 0)) " +
            "FROM Course c " +
            "LEFT JOIN Teacher t ON c.teacher.id = t.id " +
            "LEFT JOIN User ut ON t.user.id = ut.id " +
            "LEFT JOIN Review r ON r.course.id = c.id " +
            "JOIN c.users u " +
            "WHERE (u.id IS NULL AND c.status = 'ACTIVE' AND c.approveStatus = 'APPROVE') OR u.id = :userId " +
            "GROUP BY c.id, t.id, ut.firstName, ut.lastName, ut.id")
    Page<CourseDto> findCourseUserRegister(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT new response.course.dtos.vn.fpt.elearning.CmsGetDetailCourseResponse(" +
            "c.id, c.courseName, c.description, c.price, c.imageUrl, c.status, c.approveStatus, c.createDate, " +
            "u.firstName, u.lastName, u.birthday, u.gender, u.email, u.phone, u.avatar) " +
            "FROM Course c LEFT JOIN Teacher tc ON c.teacher.id = tc.id LEFT JOIN User u ON u.id = tc.user.id " +
            "WHERE c.id = :id")
    CmsGetDetailCourseResponse getDetailCourseByTeacher(@Param("id") String id);

    @Query(value = "SELECT * FROM course " +
            "LEFT JOIN course_user ON course.id = course_user.course_id " +
            "WHERE (course_user.user_id = :userId OR course.created_by = :userId) AND course.id = :courseId",
            nativeQuery = true)
    Course getCourseByTeacherOrUserId(@Param("courseId") String courseId, @Param("userId") String userId);

    @Query("SELECT c FROM Exam e INNER JOIN e.lesson l INNER JOIN l.course c WHERE e.id = :examId")
    Optional<Course> getCourseByExamId(@Param("examId") String examId);
}

