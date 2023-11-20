package vn.fpt.elearning.enums;

public enum RequestType {
    // Common
    NONE(0, "Success"),
    IDCARD_OCR(1, "ID card OCR"),
    FACE_MATCHING(2, "Face Matching"),
    ;

    private final int type;
    private final String desc;

    RequestType(int type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public int getCode() {
        return type;
    }

    public String getMessage() {
        return desc;
    }
}
