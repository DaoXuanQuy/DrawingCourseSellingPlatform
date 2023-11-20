package vn.fpt.elearning.enums;

public enum ResponseCode {
    // Common
    SUCCESS(0, "Success"),
    FAILED(1, "Failed"),
    COMMON_ERROR(2, "Common Error"),
    INVALID_PARAM(3, "Invalid param"),
    INVALID_SESSION(4, "Invalid session"),
    UNHANDLE_REQUEST(5, "Unhandle request"),
    REFRESH_TOKEN_INVALID(6, "Refresh token invalid"),
    OCR_FAILED(7, "OCR failed"),
    THIRD_PARTY_API_ERROR(8, "Không thực hiện được lúc này"),
    UPLOAD_FILE_FAILED(9, "Tải file không thành công"),
    NOT_FOUND(10, "Không tìm thấy"),

    // User
    EMAIL_EXISTED(100, "Email đã tồn tại"),
    PHONE_EXISTED(101, "Số điện thoại đã tồn tại"),
    OTP_WAS_EXPIRED(102, "OTP was expired"),
    ACCOUNT_DID_NOT_LINK(103, "Account did not link"),
    USER_NOT_FOUND(104, "Tài khoản không tồn tại"),
    USER_WAS_DELETED(104, "Tài khoản đã bị xóa"),
    EXISTED_USERNAME(105, "Existed username"),
    OTP_INCORRECT(106, "OTP incorrect"),
    USER_CREATE_FAILED(107, "Tạo tài khoản không thành công"),
    PHONE_INCORRECT(108, "Phone incorrect"),
    USER_NOT_ACTIVE(109, "Tài khoản chưa được kích hoạt"),
    PASSWORD_INCORRECT(110, "Mật khẩu không chính xác"),
    TOKEN_NOT_EXISTED(111, "Token không tồn tại"),
    TOKEN_INCORRECT(112, "Token không chính xác"),
    PASSWORD_NOT_MATCH(113, "Mật khẩu không khớp"),
    ACCOUNT_IS_BANED(114, "Tài khoản đã bị khóa"),
    USER_HAS_BEEN_ACTIVE(115, "Tài khoản đã được kích hoạt"),
    USER_NOT_AUTHENTICATED_OCR(116, "Tài khoản chưa xác thực OCR"),
    USER_INVALID(117, "Người dùng không hợp lệ"),
    EKYC_NOT_FOUND(118, "Không tìm thấy thông tin định danh"),
    ACCOUNT_NAME_INCORRECT(119, "Tên người thụ hưởng không đúng"),
    ID_CARD_EXISTED(120, "Thông tin định danh đã tồn tại"),

    //Course
    COURSE_NOT_FOUND(200, "Khóa học không tồn tại"),
    COURSE_CREATED_FAILED(201, "Thêm khóa học thất bại"),
    COURSE_UPDATE_FAILED(202, "Chỉnh sửa khóa học thất bại"),
    COURSE_NOT_TEACHER_OR_USER_REGISTER(203, "Bạn không phải là giáo viên hoặc chưa đăng ký khóa học"),
    COURSE_IS_REGISTERED(203, "Khóa học đã được đăng ký"),
    //Document
    DOCUMENT_NOT_FOUND(300, "Tài liệu không tồn tại"),
    DOCUMENT_CREATED_FAILED(301, "Thêm tài liệu thất bại"),
    DOCUMENT_UPDATE_FAILED(302, "Chỉnh sửa tài liệu thất bại"),
    COURSE_INVALID(303, "Khóa học không hợp lệ"),
    DOCUMENT_UPLOAD_FAILED(304, "Upload tài liệu thất bại, vui lòng thử lại sau"),
    DOCUMENT_DISPLAY_FAILED(305, "Trạng thái hiển thị đã được cập nhật trước đó, vui lòng thủ lại"),

    //Exam
    EXAM_NOT_FOUND(400, "Bài kiểm tra không tồn tại"),
    EXAM_CREATED_FAILED(401, "Thêm bài kiểm tra thất bại"),
    EXAM_UPDATED_FAILED(402, "Chỉnh sửa bài kiểm tra thất bại"),
    OUT_OF_ATTEMPTS(403, "Hết lượt làm bài"),
    HAVE_ATTEMPTS(404, "Đã có lượt làm bài"),

    //Question
    QUESTION_NOT_FOUND(500, "Câu hỏi không tồn tại"),
    FILE_QUESTION_INCORRECT_FORMAT(501, "File câu hỏi không đúng định dạng"),
    QUESTION_INVALID(502, "Câu hỏi không hợp lệ"),
    MUST_BE_ONLY_ONE_CORRECT_ANSWER(503, "Phải có một đáp án đúng"),

    //
    CHOOSE_RESULT_NOT_FOUND(600, "Kết quả chọn không tồn tại"),
    CHOOSE_RESULT_CREATED_FAILD(601, "Thêm kết qủa chọn thất bại"),
    CHOOSE_RESULT_UPDATED_FAILD(602, "Chỉnh sửa kết qủa chọn thất bại"),

    //Review
    REVIEW_NOT_FOUND(700, "Đánh giá không tồn tại"),
    COMMENT_NOT_FOUND(701, "Bình luận không tồn tại"),
    REVIEW_EXISTED(702, "Bạn đã đánh giá khóa học"),

    // Payment
    PAYMENT_NOT_FOUND(800, "Payment không tồn tại"),
    BILL_NOT_FOUND(801, "Hóa đơn không tồn tại"),
    PAYMENT_TRANSACTION_STATUS_INVALID(802, "Invalid transaction status"),

    // Exam result
    EXAM_RESULT_NOT_FOUND(900, "Kết quả kiểm tra không tồn tại"),
    EXAM_RESULT_CREATED_FAILED(901, "Thêm kết qủa bài kiểm tra thất bại"),
    EXAM_RESULT_UPDATED_FAILED(902, "Chỉnh sửa kết qủa bài kiểm tra thất bại"),
    SCORE_INVALID(903, "Điểm không hợp lệ"),
    EXAM_RESULT_COMPLETED(904, "Bài kiểm tra đã hoàn thành"),

    // Transaction
    TRANSACTION_FAILED(1001, "Giao dịch thất bại"),
    TRANSACTION_NOT_FOUND(1002, "Không tìm thấy giao dịch"),
    TRANSACTION_CREATED_FAILED(1003, "Tạo giao dịch không thành công"),
    TRANSACTION_CANCELED_FAILED(1004, "Hủy giao dịch không thành công"),
    //LESSON
    LESSON_NOT_FOUND(1101, "Không tìm thấy bài học"),
    LESSON_DISPLAY_FAILED(1102, "Cài đặt hiển thị thất bại"),
    /**
     * Teacher
     */
    TEACHER_NOT_FOUND(1201, "Không tìm thấy giáo viên"),
    TEACHER_REQUEST_APPROVED(1202, "Yêu cầu định danh đã được phê duyệt"),
    BANK_ACCOUNT_NOT_FOUNT(1203, "Không tìm thấy tài khoản ngân hàng"),
    WITHDRAW_NOT_ALLOW_NOW(1204, "Rút tiền hiện không hoạt động"),
    BALANCE_INSUFFICIENT(1205, "Số dư không đủ"),
    /**
     * administrator
     */
    ADMIN_IS_EXISTED(1301, "Admin đã tồn tại"),
    ADMIN_IS_INACTIVE(1302, "Admin đã bị vô hiệ hóa"),
    ADMIN_NOT_INACTIVE_YOURSELF(1303, "Không thể vô hiệu hóa chính mình"),

    ADMIN_IS_NOT_EXISTED(1301, "Không tìm thấy admin"),
    ADMIN_CREATE_FAILED(1303, "Tạo tài khoản admin không thành công"),

    /**
     * invoice
     */
    INVOICE_NOT_FOUND(1404, "Không tìm thấy hóa đơn thanh toán"),

    /**
     * option
     */
    OPTION_NOT_FOUND(1501, "Không tìm thấy lựa chọn"),

    /**
     * paygate client
     */
    PAYMENT_SERVICE_UNAVAILABLE(1608, "Dịch vụ chuyển khoản đang không hoạt động"),
    TRANSACTION_EXPIRED(1609, "Giao dịch hết hạn"),
    GET_BENEFICIARY_FAILED(1610, "Lấy thông tin thụ hưởng thất bại"),
    GET_BALANCE_FAILED(1611, "Lấy số dư thất bại"),
    FUND_TRANSFER_FAILED(1612, "Chuyển khoản thất bại"),
    QUERY_FUND_TRANSFER_FAILED(1613, "Kiểm tra chuyển khoản thất bại"),
    //Core Bank
    CORE_BANK_TRANSACTION_FAIL(10108, "Giao dịch hết hạn"),
    CORE_BANK_SECURITY_VIOLATION(10556, "Lỗi chính sách bảo mật"),

    /**
     * bank
     */
    BANK_NOT_FOUND(1701, "Ngân hàng không hỗ trợ"),

    /**
     * Chat
     */
    ROOM_CHAT_NOT_FOUND(1801, "Không tìm thấy phòng trò chuyện"),
    ROOM_CHAT_CREATE_FAIL(1802, "Tạo phòng trò chuyện mới thất bại."),

    /**
     * Forum Category
     */
    FORUM_CATEGORY_NOT_FOUND(1901, "Không tìm thấy loại topic"),

    /**
     * Forum Topic
     */
    FORUM_TOPIC_NOT_FOUND(2001, "Không tìm thấy chủ đề"),

    /**
     * Forum Post
     */
    FORUM_POST_NOT_FOUND(2101, "Không tìm thấy post"),

    /**
     * Forum Reaction
     */
    FORUM_REACTION_NOT_FOUND(2201, "Không tìm thấy reaction"),
    FORUM_REACTION_EXISTED(2202, "Reaction đã tồn tại")

    ;

    private final int code;
    private final String message;

    ResponseCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static ResponseCode valueOf(long value) {
        for (ResponseCode responseCode : ResponseCode.values()) {
            if (responseCode.getCode() == value) {
                return responseCode;
            }
        }
        return null;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
