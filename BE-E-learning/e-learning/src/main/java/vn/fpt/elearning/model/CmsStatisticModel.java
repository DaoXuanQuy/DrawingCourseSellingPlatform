package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.apache.commons.collections4.MapUtils;

import java.time.LocalDate;
import java.util.Map;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class CmsStatisticModel {
    private LocalDate date;
    private Long countUsers;
    private Long countCourses;
    public CmsStatisticModel(Map<String, Object> resultMap) {
        this.date = LocalDate.parse(MapUtils.getString(resultMap, "date"));
        this.countUsers = resultMap.get("countUsers") != null ? ((Number) resultMap.get("countUsers")).longValue() : 0L;
        this.countCourses = resultMap.get("countCourses") != null ? ((Number) resultMap.get("countCourses")).longValue() : 0L;
    }

}
