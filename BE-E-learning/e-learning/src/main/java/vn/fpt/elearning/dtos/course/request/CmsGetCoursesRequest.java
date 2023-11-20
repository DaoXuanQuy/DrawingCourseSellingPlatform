package vn.fpt.elearning.dtos.course.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.CourseStatus;

import java.time.LocalDate;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class CmsGetCoursesRequest extends BaseRequestData {
    private UUID courseId;
    private String courseName;
    private String idUser;
    private CourseStatus status;
    private ApproveStatus approveStatus;
    private LocalDate fromDate;
    private LocalDate toDate;
}
