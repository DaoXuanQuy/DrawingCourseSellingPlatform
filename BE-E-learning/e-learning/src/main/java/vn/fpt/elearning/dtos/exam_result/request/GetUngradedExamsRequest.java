package vn.fpt.elearning.dtos.exam_result.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.ExamResultStatus;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetUngradedExamsRequest extends BaseRequestData {
    @NotBlank
    private String examId;
    private ExamResultStatus status;
}
