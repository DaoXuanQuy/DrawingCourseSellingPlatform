package vn.fpt.elearning.dtos.question.response;

import lombok.*;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.dtos.option.response.OptionResponse;
import vn.fpt.elearning.entity.FillCorrect;
import vn.fpt.elearning.entity.Option;
import vn.fpt.elearning.entity.Question;
import vn.fpt.elearning.enums.QuestionType;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse extends BaseResponseData {
    private String id;
    private Integer questionNo;
    private String questionName;
    private List<FillCorrectResponse> fillCorrects;
    private Float point;
    private QuestionType questionType;
    private List<OptionResponse> options;

    public QuestionResponse(Question question, List<Option> options, List<FillCorrect> fillCorrects) {
        this.id = question.getId();
        this.questionNo = question.getQuestionNo();
        this.questionName = question.getQuestionName();
        if (fillCorrects != null) {
            this.fillCorrects = fillCorrects.parallelStream().map(FillCorrectResponse::new).collect(Collectors.toList());
        }
        this.point = question.getPoint();
        this.questionType = question.getQuestionType();
        if (options != null) {
            this.options = options.parallelStream().map(OptionResponse::new).collect(Collectors.toList());
        }
    }
    public QuestionResponse(Question question, List<Option> options, List<FillCorrect> fillCorrects, boolean isStudent) {
        this.id = question.getId();
        this.questionNo = question.getQuestionNo();
        this.questionName = question.getQuestionName();
        this.point = question.getPoint();
        this.questionType = question.getQuestionType();
        if (isStudent) {
            if (options != null) {
                this.fillCorrects = fillCorrects.parallelStream().map(fillCorrect -> new FillCorrectResponse(fillCorrect, true)).collect(Collectors.toList());
                this.options = options.parallelStream().map(option -> new OptionResponse(option, true)).collect(Collectors.toList());
            }
        } else {
            if (fillCorrects != null) {
                this.fillCorrects = fillCorrects.parallelStream().map(FillCorrectResponse::new).collect(Collectors.toList());
            }
            if (options != null) {
                this.options = options.parallelStream().map(OptionResponse::new).collect(Collectors.toList());
            }
        }
    }
}
