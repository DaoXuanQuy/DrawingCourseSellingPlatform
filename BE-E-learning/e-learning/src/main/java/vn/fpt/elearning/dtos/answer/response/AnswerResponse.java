package vn.fpt.elearning.dtos.answer.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.entity.Answer;
import vn.fpt.elearning.entity.Option;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerResponse {
    private String id;

    private String questionId;

    private String fillAnswer;

    private List<FillAnswerResponse> fillAnswers;

    private List<String> options;

    public AnswerResponse(Answer answer) {
        this.id = answer.getId();
        this.questionId = answer.getQuestion().getId();
        this.fillAnswer = answer.getFillAnswer();
        this.fillAnswers = answer.getFillAnswers().stream().map(FillAnswerResponse::new).collect(Collectors.toList());
        this.options = answer.getOptions().stream().map(Option::getId).collect(Collectors.toList());
    }

}
