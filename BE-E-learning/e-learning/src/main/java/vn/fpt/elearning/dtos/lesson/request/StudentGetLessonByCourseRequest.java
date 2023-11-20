package vn.fpt.elearning.dtos.lesson.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentGetLessonByCourseRequest extends BaseRequestData {
    private String courseId;
}
