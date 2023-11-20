package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.collections4.MapUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherStatisticModel {
    private String date;
    private Long revenue;
    public TeacherStatisticModel(Map<String, Object> resultMap) {
        this.date = MapUtils.getString(resultMap, "date").split(" ")[0];
        this.revenue = resultMap.get("revenue") != null ? ((Number) resultMap.get("revenue")).longValue() : 0L;
    }
}
