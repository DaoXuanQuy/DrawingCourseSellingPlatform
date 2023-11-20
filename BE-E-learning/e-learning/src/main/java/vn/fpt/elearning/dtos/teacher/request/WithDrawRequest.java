package vn.fpt.elearning.dtos.teacher.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WithDrawRequest extends BaseRequestData {
    @NotNull
    private BigDecimal amount;
}
