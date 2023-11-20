package vn.fpt.elearning.controller.forum.portal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.BaseResponseList;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.forum.category.request.GetCategoryListRequest;
import vn.fpt.elearning.dtos.forum.category.response.CategoryInfo;
import vn.fpt.elearning.controller.forum.portal.interfaces.IPortalForumCategoryController;

@RestController
public class PortalForumCategoryController extends BaseController implements IPortalForumCategoryController {

    @Override
    public ResponseEntity<ResponseBase<BaseResponseList<CategoryInfo>>> getInfoListWithFilter(GetCategoryListRequest request) {
        return IPortalForumCategoryController.super.getInfoListWithFilter(request);
    }
}
