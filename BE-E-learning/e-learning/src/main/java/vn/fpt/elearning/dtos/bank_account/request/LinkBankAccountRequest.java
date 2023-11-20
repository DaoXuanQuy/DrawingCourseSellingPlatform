package vn.fpt.elearning.dtos.bank_account.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LinkBankAccountRequest extends BaseRequestData {
    private String accountNo;
    private String bin;
    private String accountName;
}
