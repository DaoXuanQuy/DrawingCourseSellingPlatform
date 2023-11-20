package vn.fpt.elearning.core;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponseList<T> extends BaseResponseData {
    private List<T> data;
}
