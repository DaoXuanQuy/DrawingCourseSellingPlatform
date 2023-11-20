package vn.fpt.elearning.dtos.teacher.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.TeacherStatus;

import java.time.LocalDate;


@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class GetListTeacherRequest extends BaseRequestData {
    private String teacherName;

    private TeacherStatus status;

    private String phone;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fromDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate toDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate approveFromDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate approveToDate;
}
