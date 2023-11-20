package vn.fpt.elearning.enums;

public enum CheckTransactionCode {

    SUCCESS("00", "Giao dịch thanh toán thành công"),
    NOT_COMPLETED("01", "Giao dịch chưa hoàn tất"),
    ERROR("02", "Giao dịch bị lỗi"),
    REVERSAL("04", "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)"),
    PROCESSING("05", "VNPAY đang xử lý giao dịch này (GD hoàn tiền)"),
    REFUND("06", "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)"),
    CHEAT("07", "Giao dịch bị nghi ngờ gian lận"),
    REFUSE_TO_REFUND("09", "GD Hoàn trả bị từ chối"),

    ;

    private final String code;
    private final String message;

    CheckTransactionCode(String code, String message){
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
