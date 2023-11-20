package vn.fpt.elearning.dtos.forum.category.request;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.forum.ForumCategoryStatus;

@Getter
@Setter
public class CmsGetCategoryDetailPagingRequest extends BaseRequestData {

    private String title;
    private String parentId;
    private ForumCategoryStatus status;
}
