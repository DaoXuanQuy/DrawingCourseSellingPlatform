package vn.fpt.elearning.handler.statistic;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.statistic.request.CmsGetCardsInfoRequest;
import vn.fpt.elearning.dtos.statistic.response.CmsGetCardsInfoResponse;
import vn.fpt.elearning.service.interfaces.IStatisticService;

@Component
@RequiredArgsConstructor
@Slf4j
public class CmsGetCardsInfoHandler extends RequestHandler<CmsGetCardsInfoRequest, CmsGetCardsInfoResponse> {

    private final IStatisticService statisticService;
    @Override
    public CmsGetCardsInfoResponse handle(CmsGetCardsInfoRequest request) {
        return statisticService.cmsGetCardsInfo(request.getFromDate(), request.getToDate());
    }
}
