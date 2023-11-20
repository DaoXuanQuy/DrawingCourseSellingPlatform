package vn.fpt.elearning.controller.forum.portal;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.PageResponseData;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.topic.request.*;
import vn.fpt.elearning.dtos.forum.topic.response.TopicInfo;
import vn.fpt.elearning.controller.forum.portal.interfaces.IPortalForumTopicController;


@RestController
public class PortalForumTopicController extends BaseController implements IPortalForumTopicController {

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> createModel(CreateTopicRequest request) {
        return IPortalForumTopicController.super.createModel(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteModel(DeleteTopicRequest id) {
        return IPortalForumTopicController.super.deleteModel(id);
    }

    @Override
    public ResponseEntity<ResponseBase<PageResponseData<TopicInfo>>> getInfoListWithFilterPaging(GetTopicPagingFilterRequest request, Pageable pageable) {
        return IPortalForumTopicController.super.getInfoListWithFilterPaging(request, pageable);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> updateModel(UpdateTopicRequest request) {
        return IPortalForumTopicController.super.updateModel(request);
    }

    @Override
    public ResponseEntity<ResponseBase<TopicInfo>> getDetailById(GetTopicDetailRequest id) {
        return IPortalForumTopicController.super.getDetailById(id);
    }
}
