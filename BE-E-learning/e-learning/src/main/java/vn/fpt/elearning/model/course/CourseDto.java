package vn.fpt.elearning.model.course;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.CourseStatus;
import vn.fpt.elearning.entity.Course;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CourseDto {
    private String id;
    private String courseName;
    private String description;
    private Long price;
    private String imageUrl;
    private CourseStatus status;
    private ApproveStatus approveStatus;
    private LocalDateTime createDate;
    private String teacherId;
    private String teacherName;
    private Long studentsCount;
    private Integer discountPercentage;
    private Long currentPrice;
    private int progressPercent = 0;
    private double star;

    public CourseDto(Course course) {
        this.id = course.getId();
        this.courseName = course.getCourseName();
        this.description = course.getDescription();
        this.price = course.getPrice();
        this.imageUrl = course.getImageUrl();
        this.status = course.getStatus();
        this.approveStatus = course.getApproveStatus();
        this.createDate = course.getCreateDate();
        this.studentsCount = (long) course.getUsers().size();
        this.discountPercentage = course.getDiscountPercentage();
        this.currentPrice = course.getPrice() - course.getPrice() * course.getDiscountPercentage() / 100;
    }

    public CourseDto(String id, String courseName, String description, Long price, String imageUrl, CourseStatus status, ApproveStatus approveStatus, LocalDateTime createDate, String teacherId, String teacherName, Long studentsCount, Integer discountPercentage, Long currentPrice, int progressPercent, double star) {
        this.id = id;
        this.courseName = courseName;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.status = status;
        this.approveStatus = approveStatus;
        this.createDate = createDate;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.studentsCount = studentsCount;
        this.discountPercentage = discountPercentage;
        this.currentPrice = currentPrice;
        this.progressPercent = progressPercent;
        this.star = Double.parseDouble(String.format("%.1f", star));
    }
}
