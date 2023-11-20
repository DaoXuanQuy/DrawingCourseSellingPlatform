package vn.fpt.elearning.core;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BaseResponse {

    private int code;
    private String message;

}
