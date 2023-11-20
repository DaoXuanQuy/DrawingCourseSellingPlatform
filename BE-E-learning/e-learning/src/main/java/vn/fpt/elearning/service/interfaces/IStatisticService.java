package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.dtos.statistic.response.CmsGetCardsInfoResponse;
import vn.fpt.elearning.dtos.statistic.response.CmsGetStatisticResponse;
import vn.fpt.elearning.dtos.statistic.response.TeacherGetCardsInfoResponse;
import vn.fpt.elearning.dtos.statistic.response.TeacherGetStatisticResponse;

import java.time.LocalDate;

public interface IStatisticService {
    CmsGetCardsInfoResponse cmsGetCardsInfo(LocalDate fromDate, LocalDate toDate);
    CmsGetStatisticResponse cmsGetStatistic(LocalDate fromDate, LocalDate toDate);
    TeacherGetCardsInfoResponse teacherGetCardsInfo(String teacherId, LocalDate fromDate, LocalDate toDate);
    TeacherGetStatisticResponse teacherGetStatistic(String teacherId, LocalDate fromDate, LocalDate toDate);

}
