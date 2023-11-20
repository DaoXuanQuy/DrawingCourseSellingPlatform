package vn.fpt.elearning.core;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BaseResponseAudit<U> extends BaseResponseData {

    private U createdBy;
    private LocalDateTime createDate;
    private U lastModifiedBy;
    private LocalDateTime lastModifiedDate;
}
