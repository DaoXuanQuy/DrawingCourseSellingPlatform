package vn.fpt.elearning.dtos.exam.response;

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
public class GetExamByLessonResponse extends BaseResponseData {
    private List<ExamResponse> exams;
    private Paginate paginate;
}
