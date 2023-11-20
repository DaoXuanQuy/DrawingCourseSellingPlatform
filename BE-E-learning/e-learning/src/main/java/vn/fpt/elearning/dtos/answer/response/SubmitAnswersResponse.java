package vn.fpt.elearning.dtos.answer.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswersResponse extends BaseResponseData {
    private Double score;
    private Integer correct;
}
