package vn.fpt.elearning.dtos.lesson.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetLessonByCourseResponse extends BaseResponseData {
    private List<LessonResponse> lessons;
}
