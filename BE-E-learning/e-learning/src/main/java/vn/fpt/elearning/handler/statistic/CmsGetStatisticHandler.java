package vn.fpt.elearning.handler.statistic;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.statistic.request.CmsGetStatisticRequest;
import vn.fpt.elearning.dtos.statistic.response.CmsGetStatisticResponse;
import vn.fpt.elearning.service.interfaces.IStatisticService;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class CmsGetStatisticHandler extends RequestHandler<CmsGetStatisticRequest, CmsGetStatisticResponse> {

    private final IStatisticService statisticService;
    @Override

    public CmsGetStatisticResponse handle(CmsGetStatisticRequest request) {
        if (request.getFromDate() == null && request.getToDate() == null) {
            LocalDate now = LocalDate.now();
            request.setToDate(now);
            request.setFromDate(LocalDate.of(now.getYear(), now.getMonth(), 1));
        } else if (request.getFromDate() == null) {
            request.setFromDate(request.getToDate().minusDays(30));
        } else if (request.getToDate() == null) {
            request.setToDate(LocalDate.now());
        }
        return statisticService.cmsGetStatistic(request.getFromDate(), request.getToDate());
    }
}
