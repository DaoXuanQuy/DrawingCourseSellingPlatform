package vn.fpt.elearning.dtos.bank_account.response;

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
public class GetAllBanksResponse extends BaseResponseData {
    private List<BankResponse> banks;
    private Paginate paginate;
}
