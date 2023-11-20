package vn.fpt.elearning.enums;

public enum ReasonDenyEkyc {
    INVALID_ID_CARD("CCCD/CMND không hợp lệ"),
    BLUR_ID_CARD("CCD/CMND mờ")
    ;
    private final String description;

    ReasonDenyEkyc(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
