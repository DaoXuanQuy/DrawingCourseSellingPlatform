package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.dtos.option.request.CreateOptionRequest;
import vn.fpt.elearning.enums.QuestionType;

import javax.validation.constraints.NotNull;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionInfo {
    @NotNull
    private Integer questionNo;
    private String questionName;

    private List<FillCorrectInfo> fillCorrects;
    @NotNull
    private Float point;
    @NotNull
    private QuestionType questionType;

    private List<CreateOptionRequest> options;
}

