package vn.fpt.elearning.dtos.exam_result.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseRequestData;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
public class DeleteExamResultRequest extends BaseRequestData {
    private String id;
}
