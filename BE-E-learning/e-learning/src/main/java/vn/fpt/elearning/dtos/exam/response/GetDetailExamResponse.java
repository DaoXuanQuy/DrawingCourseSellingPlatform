package vn.fpt.elearning.dtos.exam.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.Question;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class GetDetailExamResponse extends BaseResponseData {
    private String id;
    private String lessonId;
    private String examName;
    private LocalDateTime createAt;
    private Integer questionTotal;
    private Integer timeMinute;
    private List<Question> questions;

    public GetDetailExamResponse(Exam exam) {
        this.id = exam.getId();
        this.lessonId = exam.getLesson().getId();
        this.createAt = exam.getCreateDate();
        this.examName = exam.getExamName();
        this.timeMinute = exam.getTimeMinute();
        this.questions = exam.getQuestions();
    }
}
