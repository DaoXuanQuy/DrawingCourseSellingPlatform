package vn.fpt.elearning.controller.forum.portal;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.reaction.request.CreateReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.request.DeleteReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.request.GetReactionFilterPagingRequest;
import vn.fpt.elearning.dtos.forum.reaction.request.UpdateReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.response.ReactionInfo;
import vn.fpt.elearning.controller.forum.portal.interfaces.IPortalForumReactionController;

@RestController
public class PortalForumReactionController extends BaseController implements IPortalForumReactionController {

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> createModel(CreateReactionRequest request) {
        return IPortalForumReactionController.super.createModel(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteModel(DeleteReactionRequest id) {
        return IPortalForumReactionController.super.deleteModel(id);
    }

    @Override
    public ResponseEntity<ResponseBase<PageResponseData<ReactionInfo>>> getInfoListWithFilterPaging(GetReactionFilterPagingRequest request, Pageable pageable) {
        return IPortalForumReactionController.super.getInfoListWithFilterPaging(request, pageable);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> updateModel(UpdateReactionRequest request) {
        return IPortalForumReactionController.super.updateModel(request);
    }
}
