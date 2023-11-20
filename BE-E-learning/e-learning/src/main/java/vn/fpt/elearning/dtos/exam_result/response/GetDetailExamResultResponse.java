package vn.fpt.elearning.dtos.exam_result.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ExamResultStatus;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class GetDetailExamResultResponse extends BaseResponseData {
    private String id;
    private String examId;
    private String userId;
    private Double score;
    private Integer correctTotal;
    private LocalDateTime time;
    private String comment;
    private ExamResultStatus status;

    public GetDetailExamResultResponse(ExamResult examResultEntity) {
        this.id = examResultEntity.getId();
        this.examId = examResultEntity.getExam().getId();
        this.userId = examResultEntity.getUser().getId();
        this.score = examResultEntity.getScore();
        this.correctTotal = examResultEntity.getCorrectTotal();
        this.time = examResultEntity.getTime();
        this.comment = examResultEntity.getComment();
        this.status = examResultEntity.getStatus();
    }
}
