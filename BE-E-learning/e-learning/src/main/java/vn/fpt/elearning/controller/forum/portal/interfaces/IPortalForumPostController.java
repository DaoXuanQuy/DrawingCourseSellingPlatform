package vn.fpt.elearning.controller.forum.portal.interfaces;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.controller.ICreateModelController;
import vn.fpt.elearning.core.controller.IDeleteModelController;
import vn.fpt.elearning.core.controller.IGetInfoListFilterPagingController;
import vn.fpt.elearning.core.controller.IUpdateModelController;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.post.request.CreatePostRequest;
import vn.fpt.elearning.dtos.forum.post.request.DeletePostRequest;
import vn.fpt.elearning.dtos.forum.post.request.GetPostPagingRequest;
import vn.fpt.elearning.dtos.forum.post.request.UpdatePostRequest;
import vn.fpt.elearning.dtos.forum.post.response.PostInfo;

@Tag(name = "[PORTAL] Forum Post Controller")
@RequestMapping("/api/v1/forum/post")
public interface IPortalForumPostController extends
        ICreateModelController<CreatePostRequest, StatusResponse>,
        IUpdateModelController<UpdatePostRequest, StatusResponse>,
        IDeleteModelController<DeletePostRequest, StatusResponse>,
        IGetInfoListFilterPagingController<GetPostPagingRequest, PostInfo> {
}
