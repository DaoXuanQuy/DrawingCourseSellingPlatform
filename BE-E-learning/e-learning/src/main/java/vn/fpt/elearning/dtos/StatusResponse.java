package vn.fpt.elearning.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatusResponse extends BaseResponseData {
    private boolean success = true;
}
