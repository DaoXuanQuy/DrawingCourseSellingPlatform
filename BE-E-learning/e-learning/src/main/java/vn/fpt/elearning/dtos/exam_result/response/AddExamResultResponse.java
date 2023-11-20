package vn.fpt.elearning.dtos.exam_result.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.ExamResult;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class AddExamResultResponse extends BaseResponseData {
    private String id;
    private String examId;
    private String userId;
    private Double score;
    private Integer correctTotal;
    private String comment;
    private LocalDateTime time;

    public AddExamResultResponse(ExamResult examResultEntity) {
        this.id = examResultEntity.getId();
        this.examId = examResultEntity.getExam().getId();
        this.userId = examResultEntity.getUser().getId();
        this.score = examResultEntity.getScore();
        this.correctTotal = examResultEntity.getCorrectTotal();
        this.comment= examResultEntity.getComment();
        this.time = examResultEntity.getTime();
    }
}
