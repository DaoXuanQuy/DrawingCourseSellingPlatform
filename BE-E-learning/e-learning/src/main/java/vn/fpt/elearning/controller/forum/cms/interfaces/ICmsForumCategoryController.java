package vn.fpt.elearning.controller.forum.cms.interfaces;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.controller.*;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.category.request.*;
import vn.fpt.elearning.dtos.forum.category.response.CategoryDetail;


@Tag(name = "[CMS] Forum Category Controller")
@RequestMapping("/api/v1/cms/forum/category")
public interface ICmsForumCategoryController extends
        ICreateModelController<CreateCategoryRequest, StatusResponse>,
        IGetDetailByIdController<GetCategoryDetailRequest, CategoryDetail>,
        IGetDetailFilterPagingController<CmsGetCategoryDetailPagingRequest, CategoryDetail>,
        IUpdateModelController<UpdateCategoryRequest, StatusResponse>,
        IDeleteModelController<DeleteCategoryRequest, StatusResponse> {
}
