package vn.fpt.elearning.dtos.answer.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubmitAnswerRequest {
    @NotBlank
    private String questionId;
    private List<FillAnswerInfo> fillAnswers;
    private List<String> options;
    private String fillAnswer;


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FillAnswerInfo {
        private String id;
        private String answer;
    }
}

