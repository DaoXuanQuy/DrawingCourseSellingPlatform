package vn.fpt.elearning.dtos.teacher.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.dtos.bank_account.response.BankResponse;
import vn.fpt.elearning.entity.WithdrawInvoice;
import vn.fpt.elearning.enums.FTStatus;
import vn.fpt.elearning.mapper.IUserMapper;
import vn.fpt.elearning.model.user.UserDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class WithdrawResponse extends BaseResponseData {
    private String id;
    private String txnNumber;
    private String accountNo;
    private String accountName;
    private BigDecimal amount;
    private BankResponse bank;
    private FTStatus status;
    private LocalDateTime time;
    private UserDto user;

    public WithdrawResponse(WithdrawInvoice invoice, IUserMapper userMapper) {
        this.id = invoice.getId();
        this.txnNumber = invoice.getTxnNumber();
        this.accountNo = invoice.getToAccountNo();
        this.accountName = invoice.getToAccountName();
        this.amount = invoice.getAmount();
        this.bank = new BankResponse(invoice.getBank());
        this.status = invoice.getStatus();
        this.time = invoice.getTime();
        if (userMapper != null) {
            this.user = userMapper.toUserDto(invoice.getTeacher().getUser());
        }
    }
}
