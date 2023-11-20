package vn.fpt.elearning.dtos.exam.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseRequestData;

@Data
@EqualsAndHashCode(callSuper = true)
public class GetDetailExamRequest extends BaseRequestData {
    private String id;
}
