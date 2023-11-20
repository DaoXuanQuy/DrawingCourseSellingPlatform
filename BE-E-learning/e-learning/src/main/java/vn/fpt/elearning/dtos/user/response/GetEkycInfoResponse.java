package vn.fpt.elearning.dtos.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.EkycDTO;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetEkycInfoResponse extends BaseResponseData {
    private EkycDTO ekyc;
}
