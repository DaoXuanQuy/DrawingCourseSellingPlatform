package vn.fpt.elearning.dtos.teacher.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.ReasonDenyEkyc;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class RejectRequestRoleTeacherRequest extends BaseRequestData {
    private String teacherId;
    private List<ReasonDenyEkyc> reason;
    private String descriptionReason;
}
