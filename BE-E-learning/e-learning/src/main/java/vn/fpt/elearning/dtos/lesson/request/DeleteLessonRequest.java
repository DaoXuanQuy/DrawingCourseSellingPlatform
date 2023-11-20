package vn.fpt.elearning.dtos.lesson.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteLessonRequest extends BaseRequestData {
    private String id;
}
