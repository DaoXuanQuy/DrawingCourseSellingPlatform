package vn.fpt.elearning.dtos.exam_result.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetExamResultRequest extends BaseRequestData {
    private String examId;
}
