package vn.fpt.elearning.dtos.answer.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.dtos.answer.request.SubmitAnswerRequest;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class GetCurrentAnswerResponse extends BaseResponseData {
    private List<SubmitAnswerRequest> answers;
    private Long timestamp;
}
