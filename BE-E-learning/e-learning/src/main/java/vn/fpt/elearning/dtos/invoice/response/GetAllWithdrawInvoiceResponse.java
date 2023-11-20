package vn.fpt.elearning.dtos.invoice.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.dtos.teacher.response.WithdrawResponse;
import vn.fpt.elearning.utils.Paginate;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetAllWithdrawInvoiceResponse extends BaseResponseData {
    private List<WithdrawResponse> invoices;
    private Paginate paginate;
}
