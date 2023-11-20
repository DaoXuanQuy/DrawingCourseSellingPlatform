package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.entity.Exam;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExamInfo {
    private String id;
    private String examName;
    private LocalDateTime createAt;
    private int testAttempts;
    private int timeMinute;
    public ExamInfo(Exam exam) {
        this.id = exam.getId();
        this.examName = exam.getExamName();
        this.createAt = exam.getCreateDate();
        this.timeMinute = exam.getTimeMinute();
        this.testAttempts = exam.getTestAttempts();
    }
}
