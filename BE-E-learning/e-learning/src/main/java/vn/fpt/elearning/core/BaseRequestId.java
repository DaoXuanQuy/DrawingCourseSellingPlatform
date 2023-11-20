package vn.fpt.elearning.core;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseRequestId<ID> extends BaseRequestData implements BaseID<ID>{

    private ID id;
}
