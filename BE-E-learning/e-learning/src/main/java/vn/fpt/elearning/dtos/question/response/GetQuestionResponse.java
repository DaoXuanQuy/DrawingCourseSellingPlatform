package vn.fpt.elearning.dtos.question.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class GetQuestionResponse extends BaseResponseData {
    private List<QuestionResponse> questions;
    private Paginate paginate;
}
