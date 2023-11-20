package vn.fpt.elearning.core;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class BaseRequestData implements RequestData {
    @JsonIgnore
    private String accessToken;
    @JsonIgnore
    private String cifNo;
    @JsonIgnore
    private HttpServletRequest context;
    @JsonIgnore
    private String clientId;
    @JsonIgnore
    private String userId;

    @Hidden
    @JsonIgnore
    private Pageable pageable = Pageable.unpaged();

    public LocalDateTime fromDatetime(LocalDate fromDate) {
        if (fromDate != null) {
            return fromDate.atStartOfDay();
        }
        return null;
    }

    public LocalDateTime toDatetime(LocalDate toDate) {
        if (toDate != null) {
            return toDate.atTime(LocalTime.MAX);
        }
        return null;
    }
}
