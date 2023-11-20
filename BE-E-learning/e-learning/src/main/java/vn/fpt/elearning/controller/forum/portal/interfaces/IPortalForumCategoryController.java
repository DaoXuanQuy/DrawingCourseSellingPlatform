package vn.fpt.elearning.controller.forum.portal.interfaces;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.controller.IGetInfoListFilterController;
import vn.fpt.elearning.dtos.forum.category.request.GetCategoryListRequest;
import vn.fpt.elearning.dtos.forum.category.response.CategoryInfo;

@Tag(name = "[PORTAL] Forum Category Controller")
@RequestMapping("/api/v1/forum/category")
public interface IPortalForumCategoryController extends IGetInfoListFilterController<GetCategoryListRequest, CategoryInfo> {
}
