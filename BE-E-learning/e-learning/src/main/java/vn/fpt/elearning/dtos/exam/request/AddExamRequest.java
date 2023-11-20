package vn.fpt.elearning.dtos.exam.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.ExamType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@EqualsAndHashCode(callSuper = true)
public class AddExamRequest extends BaseRequestData {
    @NotBlank
    private String lessonId;
    @NotBlank
    private String examName;
    @NotNull
    private Integer timeMinute;
    @NotNull
    private ExamType examType;
    @Positive
    private Integer testAttempts;

}
