package vn.fpt.elearning.dtos.invoice.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetAllInvoiceResponse extends BaseResponseData {
    private List<InvoiceResponse> invoices;
    private Paginate paginate;
}
