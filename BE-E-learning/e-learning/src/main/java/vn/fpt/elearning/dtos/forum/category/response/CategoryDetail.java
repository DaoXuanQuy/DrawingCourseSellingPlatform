package vn.fpt.elearning.dtos.forum.category.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.enums.forum.ForumCategoryStatus;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDetail extends CategoryInfo {

    private ForumCategoryStatus status;

    public CategoryDetail(String id, String title, String description, Long topic, Long post, String parentId, String status) {
        super(id, title, description, topic, post, parentId);
        this.status = ForumCategoryStatus.valueOf(status);
    }
}
