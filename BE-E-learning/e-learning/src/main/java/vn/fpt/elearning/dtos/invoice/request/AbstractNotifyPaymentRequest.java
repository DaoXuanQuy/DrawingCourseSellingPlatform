package vn.fpt.elearning.dtos.invoice.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class AbstractNotifyPaymentRequest extends BaseRequestData {

    @JsonAlias({"transactionId", "vnp_TransactionNo"})
    protected String transactionId;
    @JsonAlias({"refTransactionId", "vnp_TxnRef"})
    protected String refTransactionId;
    @JsonAlias({"amount", "vnp_Amount"})
    protected Long amount;
    @JsonAlias({"transferDesc", "vnp_OrderInfo"})
    protected String transferDesc;
    @JsonAlias({"txnNumber", "vnp_BankTranNo"})
    protected String txnNumber;

    @SuppressWarnings("unchecked")
    public <T extends AbstractNotifyPaymentRequest> T unwrap(Class<T> type) {
        if (type.isInstance(this)) {
            return (T) this;
        }
        throw new IllegalArgumentException();
    }
}
