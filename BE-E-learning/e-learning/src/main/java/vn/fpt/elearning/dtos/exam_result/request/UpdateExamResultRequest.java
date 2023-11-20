package vn.fpt.elearning.dtos.exam_result.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseRequestData;

@Data
@EqualsAndHashCode(callSuper = true)
public class UpdateExamResultRequest extends BaseRequestData {
    private String id;
    private Double score;
    private Integer correctTotal;
    private String comment;
}
