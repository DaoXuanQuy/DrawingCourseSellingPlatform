package vn.fpt.elearning.dtos.answer.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.dtos.question.response.QuestionResponse;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GetSubmitAnswerByExamResultResponse extends BaseResponseData {

    private List<SubmitAnswer> answers;
    private Paginate paginate;

    public GetSubmitAnswerByExamResultResponse(List<SubmitAnswer> answers, Paginate paginate) {
        this.answers = answers;
        this.paginate = paginate;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SubmitAnswer {
        private QuestionResponse question;
        private AnswerResponse answer;
    }
}
