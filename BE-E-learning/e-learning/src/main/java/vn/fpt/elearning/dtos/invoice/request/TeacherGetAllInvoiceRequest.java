package vn.fpt.elearning.dtos.invoice.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.InvoiceStatus;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherGetAllInvoiceRequest extends BaseRequestData {
    private InvoiceStatus status;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Schema(example = "01/01/2023")
    private LocalDate fromDate;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Schema(example = "01/01/2029")
    private LocalDate toDate;
}
