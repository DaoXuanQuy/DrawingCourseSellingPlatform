package vn.fpt.elearning.dtos.bank_account.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckBankAccountRequest extends BaseRequestData {
    @NotBlank
    private String accountNo;
    @NotBlank
    private String bin;
}