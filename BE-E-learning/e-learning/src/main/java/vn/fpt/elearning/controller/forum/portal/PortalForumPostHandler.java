package vn.fpt.elearning.controller.forum.portal;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.post.request.CreatePostRequest;
import vn.fpt.elearning.dtos.forum.post.request.DeletePostRequest;
import vn.fpt.elearning.dtos.forum.post.request.GetPostPagingRequest;
import vn.fpt.elearning.dtos.forum.post.request.UpdatePostRequest;
import vn.fpt.elearning.dtos.forum.post.response.PostInfo;
import vn.fpt.elearning.controller.forum.portal.interfaces.IPortalForumPostController;

@RestController
public class PortalForumPostHandler extends BaseController implements IPortalForumPostController {

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> createModel(CreatePostRequest request) {
        return IPortalForumPostController.super.createModel(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteModel(DeletePostRequest id) {
        return IPortalForumPostController.super.deleteModel(id);
    }

    @Override
    public ResponseEntity<ResponseBase<PageResponseData<PostInfo>>> getInfoListWithFilterPaging(GetPostPagingRequest request, Pageable pageable) {
        return IPortalForumPostController.super.getInfoListWithFilterPaging(request, pageable);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> updateModel(UpdatePostRequest request) {
        return IPortalForumPostController.super.updateModel(request);
    }
}
