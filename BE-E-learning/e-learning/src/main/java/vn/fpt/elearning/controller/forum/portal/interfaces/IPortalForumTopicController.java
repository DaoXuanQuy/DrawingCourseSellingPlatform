package vn.fpt.elearning.controller.forum.portal.interfaces;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.controller.*;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.forum.topic.request.*;
import vn.fpt.elearning.dtos.forum.topic.response.TopicInfo;


@Tag(name = "[PORTAL] Forum Topic Controller")
@RequestMapping("/api/v1/forum/topic")
public interface IPortalForumTopicController extends
        ICreateModelController<CreateTopicRequest, StatusResponse>,
        IUpdateModelController<UpdateTopicRequest, StatusResponse>,
        IDeleteModelController<DeleteTopicRequest, StatusResponse>,
        IGetInfoListFilterPagingController<GetTopicPagingFilterRequest, TopicInfo>,
        IGetDetailByIdController<GetTopicDetailRequest, TopicInfo> {
}
