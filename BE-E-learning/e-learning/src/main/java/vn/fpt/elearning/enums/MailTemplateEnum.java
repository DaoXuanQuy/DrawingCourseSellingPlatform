package vn.fpt.elearning.enums;

import lombok.Getter;

@Getter
public enum MailTemplateEnum {
    APPROVE_TEACHER("[E LEARNING] Phê duyệt thành công"),
    CREATE_USER("[E LEARNING] Đăng ký tài khoản thành công"),
    REACTIVE_USER("[E LEARNING] Kích hoạt tài khoản"),
    BAN_USER("[E LEARNING] Khoá tài khoản"),
    REJECT_TEACHER("[E LEARNING]Từ chối phê duyệt"),
    FORGOT_PASSWORD("[E LEARNING]Quên mật khẩu"),
    NOTIFY_WITHDRAW("[E LEARNING]Thông báo rút tiền")
    ;
    private final String subject;

    MailTemplateEnum(String subject) {
        this.subject = subject;
    }
}
