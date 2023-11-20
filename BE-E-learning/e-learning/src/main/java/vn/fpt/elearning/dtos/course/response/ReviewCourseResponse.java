package vn.fpt.elearning.dtos.course.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.dtos.lesson.response.LessonResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.CourseStatus;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewCourseResponse extends BaseResponseData {
    private String id;
    private String courseName;
    private String description;
    private Long price;
    private Integer discountPercentage;
    private String teacherName;
    private String imageUrl;
    private CourseStatus status;
    private ApproveStatus approveStatus;
    private LocalDateTime createDate;
    private List<LessonResponse> lessons;
    private Long studentsCount;
    private Long examsCount;

    public ReviewCourseResponse(Course course) {
        User user = course.getTeacher().getUser();
        this.id = course.getId();
        this.courseName = course.getCourseName();
        this.description = course.getDescription();
        this.price = course.getPrice();
        this.discountPercentage = course.getDiscountPercentage();
        this.teacherName = String.format("%s %s", user.getFirstName(), user.getLastName());
        this.imageUrl = course.getImageUrl();
        this.status = course.getStatus();
        this.approveStatus = course.getApproveStatus();
        this.createDate = course.getCreateDate();
        this.studentsCount = (long) course.getUsers().size();
    }
}
