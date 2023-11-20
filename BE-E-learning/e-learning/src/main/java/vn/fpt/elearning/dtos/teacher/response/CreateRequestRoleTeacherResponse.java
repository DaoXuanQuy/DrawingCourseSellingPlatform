package vn.fpt.elearning.dtos.teacher.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.teacher.TeacherDto;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRequestRoleTeacherResponse extends BaseResponseData {
    private TeacherDto teacher;
}
