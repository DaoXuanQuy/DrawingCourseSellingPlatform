package vn.fpt.elearning.dtos.exam.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Pageable;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentGetExamByLessonRequest extends BaseRequestData {
    @NotBlank
    private String lessonId;
    @JsonIgnore
    private Pageable pageable;
}
