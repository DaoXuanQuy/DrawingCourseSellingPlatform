package vn.fpt.elearning.client.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;

@Getter
@RequiredArgsConstructor
public enum PayTransactionStatus {
    NONE("Tất cả"),
    CREATED("Chờ thanh toán"),
    SUCCESS("Thành công"),
    CANCELED("Đã Hủy"),
    FAIL("Thất bại"),
    TIMEOUT("Hết hạn"),
    ;

    private final String description;

    public static String valueOf(PayTransactionStatus status) {
        for (PayTransactionStatus transactionStatus : PayTransactionStatus.values()) {
            if (transactionStatus == status) {
                return transactionStatus.getDescription();
            }
        }
        throw new InternalException(ResponseCode.PAYMENT_TRANSACTION_STATUS_INVALID);
    }

}