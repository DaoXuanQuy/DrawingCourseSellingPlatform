package vn.fpt.elearning.dtos.answer.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetSubmitAnswerByExamResultRequest extends BaseRequestData {
    @NotBlank
    private String examResultId;
}
