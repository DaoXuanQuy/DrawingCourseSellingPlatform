package vn.fpt.elearning.dtos.exam.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.ExamStatus;
import vn.fpt.elearning.enums.ExamType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Data
@EqualsAndHashCode(callSuper = true)
public class UpdateExamRequest extends BaseRequestData {
    @NotBlank
    private String id;
    private String examName;
    @Positive
    private Integer timeMinute;
    private ExamType examType;
    private ExamStatus status;
    @Positive
    private Integer testAttempts;
}
