package vn.fpt.elearning.client.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CoreResponseBase<T> {

    private String code;
    private String message;
    private boolean success;
    private T data;

}
