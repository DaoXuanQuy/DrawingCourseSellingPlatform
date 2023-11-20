package vn.fpt.elearning.dtos.exam_result.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.time.DurationFormatUtils;
import vn.fpt.elearning.enums.ExamResultStatus;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
public class UngradedExamResponse {
    private String id;
    private String userId;
    private String name;
    private LocalDateTime createTime;
    private LocalDateTime submitTime;
    private String duration;
    private Integer correctTotal;
    private Double score;
    private String comment;
    private ExamResultStatus status;


    public UngradedExamResponse(String id, String userId, String name, LocalDateTime createTime, LocalDateTime submitTime, Integer correctTotal, Double score, ExamResultStatus status, String comment) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.createTime = createTime;
        this.submitTime = submitTime;
        this.correctTotal = correctTotal;
        this.score = score;
        this.comment = comment;
        this.status = status;
        this.duration = DurationFormatUtils.formatDuration(Duration.between(createTime, Objects.requireNonNullElseGet(submitTime, LocalDateTime::now)).toMillis(), "HH:mm:ss", true);
    }
}