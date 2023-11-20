package vn.fpt.elearning.model.teacher;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.enums.TeacherStatus;
import vn.fpt.elearning.model.EkycDTO;
import vn.fpt.elearning.model.user.UserDto;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDto {
    private String id;
    private UserDto user;
    private EkycDTO ekyc;
    private TeacherStatus status;
    private String reasonDeny;
    private LocalDateTime createDate;
    private LocalDateTime approveDate;
}
