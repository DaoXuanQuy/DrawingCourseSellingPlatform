package vn.fpt.elearning.dtos.forum.category.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.dtos.forum.topic.response.TopicInfo;

@Getter
@Setter
@NoArgsConstructor
public class CategoryInfo extends BaseResponseData {

    protected String id;
    protected String title;
    protected String description;
    private Long topic;
    private Long post;
    private TopicInfo latestTopicInfo;
    private String parentId;

    public CategoryInfo(String id, String title, String description, Long topic, Long post, String parentId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.topic = topic;
        this.post = post;
        this.parentId = parentId;
    }
}
