package vn.fpt.elearning.controller.forum.cms;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.controller.forum.cms.interfaces.ICmsForumCategoryController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.category.request.*;
import vn.fpt.elearning.dtos.forum.category.response.CategoryDetail;

@RestController
public class ForumCategoryController extends BaseController implements ICmsForumCategoryController {

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> createModel(CreateCategoryRequest request) {
        return ICmsForumCategoryController.super.createModel(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteModel(DeleteCategoryRequest id) {
        return ICmsForumCategoryController.super.deleteModel(id);
    }

    @Override
    public ResponseEntity<ResponseBase<CategoryDetail>> getDetailById(GetCategoryDetailRequest id) {
        return ICmsForumCategoryController.super.getDetailById(id);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> updateModel(UpdateCategoryRequest request) {
        return ICmsForumCategoryController.super.updateModel(request);
    }

    @Override
    public ResponseEntity<ResponseBase<PageResponseData<CategoryDetail>>> getDetailWithFilterPaging(CmsGetCategoryDetailPagingRequest request, Pageable pageable) {
        return ICmsForumCategoryController.super.getDetailWithFilterPaging(request, pageable);
    }
}
