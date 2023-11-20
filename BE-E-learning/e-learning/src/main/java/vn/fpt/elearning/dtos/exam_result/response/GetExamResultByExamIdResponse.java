package vn.fpt.elearning.dtos.exam_result.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetExamResultByExamIdResponse extends BaseResponseData {
    private List<GetDetailExamResultResponse> examResults;
    private Paginate paginate;
}
