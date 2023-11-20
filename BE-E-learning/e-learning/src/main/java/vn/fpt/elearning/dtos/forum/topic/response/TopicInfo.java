package vn.fpt.elearning.dtos.forum.topic.response;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseAudit;
import vn.fpt.elearning.dtos.forum.UserForum;

@Getter
@Setter
public class TopicInfo extends BaseResponseAudit<String> {
    private String id;
    private String title;
    private String tags;
    private String path;
    private String categoryId;
    private UserForum user;
}
