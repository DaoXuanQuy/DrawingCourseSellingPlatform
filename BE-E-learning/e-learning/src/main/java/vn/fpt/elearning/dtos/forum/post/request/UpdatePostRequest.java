package vn.fpt.elearning.dtos.forum.post.request;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestId;

@Getter
@Setter
public class UpdatePostRequest extends BaseRequestId<String> {

    private String content;
}
