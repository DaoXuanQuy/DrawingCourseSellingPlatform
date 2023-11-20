package vn.fpt.elearning.dtos.question.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.model.QuestionInfo;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateListQuestionRequest extends BaseRequestData {
    @NotBlank
    private String examId;
    private List<@Valid QuestionInfo> questions;
}


