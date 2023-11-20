package vn.fpt.elearning.dtos.course.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.Course;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class InfoCourseInPageCourse extends BaseResponseData {
    private String id;
    private String courseName;
    private String title;
    private String description;
    private LocalDateTime createAt;
    private String avatar;
    private Long price;

    public InfoCourseInPageCourse(Course course) {
        this.id = course.getId();
        this.courseName = course.getCourseName();
        this.description = course.getDescription();
        this.createAt = course.getCreateDate();
        this.price = course.getPrice();
    }
}
