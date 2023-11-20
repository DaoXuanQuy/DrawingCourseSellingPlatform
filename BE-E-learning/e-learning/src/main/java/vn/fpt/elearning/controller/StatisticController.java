package vn.fpt.elearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.statistic.request.CmsGetCardsInfoRequest;
import vn.fpt.elearning.dtos.statistic.request.CmsGetStatisticRequest;
import vn.fpt.elearning.dtos.statistic.request.TeacherGetCardsInfoRequest;
import vn.fpt.elearning.dtos.statistic.request.TeacherGetStatisticRequest;
import vn.fpt.elearning.dtos.statistic.response.CmsGetCardsInfoResponse;
import vn.fpt.elearning.dtos.statistic.response.CmsGetStatisticResponse;
import vn.fpt.elearning.dtos.statistic.response.TeacherGetCardsInfoResponse;
import vn.fpt.elearning.dtos.statistic.response.TeacherGetStatisticResponse;
import vn.fpt.elearning.controller.interfaces.IStatisticController;

@RestController
public class StatisticController extends BaseController implements IStatisticController {
    @Override
    public ResponseEntity<ResponseBase<CmsGetCardsInfoResponse>> cmsGetCardsInfo(CmsGetCardsInfoRequest request) {
        return this.execute(request, CmsGetCardsInfoResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<CmsGetStatisticResponse>> cmsGetStatistic(CmsGetStatisticRequest request) {
        return this.execute(request, CmsGetStatisticResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<TeacherGetCardsInfoResponse>> teacherGetCardsInfo(TeacherGetCardsInfoRequest request) {
        return this.execute(request, TeacherGetCardsInfoResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<TeacherGetStatisticResponse>> teacherGetStatistic(TeacherGetStatisticRequest request) {
        return this.execute(request, TeacherGetStatisticResponse.class);
    }
}
