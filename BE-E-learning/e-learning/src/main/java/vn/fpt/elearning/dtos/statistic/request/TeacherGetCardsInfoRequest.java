package vn.fpt.elearning.dtos.statistic.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import vn.fpt.elearning.core.BaseRequestData;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TeacherGetCardsInfoRequest extends BaseRequestData {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fromDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate toDate;

    public LocalDate getToDate() {
        if (toDate != null) {
            return toDate.plusDays(1);
        }
        return null;
    }
}
