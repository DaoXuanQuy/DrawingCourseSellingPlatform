package vn.fpt.elearning.controller.forum.portal.interfaces;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.controller.ICreateModelController;
import vn.fpt.elearning.core.controller.IDeleteModelController;
import vn.fpt.elearning.core.controller.IGetInfoListFilterPagingController;
import vn.fpt.elearning.core.controller.IUpdateModelController;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.reaction.request.CreateReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.request.DeleteReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.request.GetReactionFilterPagingRequest;
import vn.fpt.elearning.dtos.forum.reaction.request.UpdateReactionRequest;
import vn.fpt.elearning.dtos.forum.reaction.response.ReactionInfo;

@Tag(name = "[PORTAL] Forum Reaction Controller")
@RequestMapping("/api/v1/forum/reaction")
public interface IPortalForumReactionController extends
        ICreateModelController<CreateReactionRequest, StatusResponse>,
        IUpdateModelController<UpdateReactionRequest, StatusResponse>,
        IDeleteModelController<DeleteReactionRequest, StatusResponse>,
        IGetInfoListFilterPagingController<GetReactionFilterPagingRequest, ReactionInfo> {
}
