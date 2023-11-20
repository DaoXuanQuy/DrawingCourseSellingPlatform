package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.dtos.statistic.response.CmsGetCardsInfoResponse;
import vn.fpt.elearning.dtos.statistic.response.CmsGetStatisticResponse;
import vn.fpt.elearning.dtos.statistic.response.TeacherGetCardsInfoResponse;
import vn.fpt.elearning.dtos.statistic.response.TeacherGetStatisticResponse;
import vn.fpt.elearning.model.CmsStatisticModel;
import vn.fpt.elearning.model.TeacherStatisticModel;
import vn.fpt.elearning.repository.StatisticRepository;
import vn.fpt.elearning.service.interfaces.IStatisticService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatisticService implements IStatisticService {
    private final StatisticRepository statisticRepository;

    @Override
    public CmsGetCardsInfoResponse cmsGetCardsInfo(LocalDate fromDate, LocalDate toDate) {
        return new CmsGetCardsInfoResponse(statisticRepository.cmsFindCardsInfo(fromDate, toDate));
    }

    @Override
    public CmsGetStatisticResponse cmsGetStatistic(LocalDate fromDate, LocalDate toDate) {
        Long countUsers = statisticRepository.countUserDateBefore(fromDate.atStartOfDay());
        Long countCourses = statisticRepository.countCourseDateBefore(fromDate.atStartOfDay());
        List<Map<String, Object>> listMap = statisticRepository.cmsGetStatistic(fromDate, toDate.plusDays(1));
        Map<LocalDate, CmsStatisticModel> statistics = new HashMap<>();

        for(Map<String, Object> map : listMap) {
            CmsStatisticModel model = new CmsStatisticModel(map);
            statistics.put(model.getDate(), model);
        }
        List<CmsStatisticModel> result = new ArrayList<>();
        while(fromDate.isBefore(toDate) || fromDate.equals(toDate)) {
            CmsStatisticModel resultItem = new CmsStatisticModel()
                .setDate(fromDate)
                .setCountUsers(countUsers)
                .setCountCourses(countCourses);
            if (statistics.containsKey(fromDate)) {
                CmsStatisticModel statisticModel = statistics.get(fromDate);
                countUsers += statisticModel.getCountUsers();
                countCourses += statisticModel.getCountCourses();
                resultItem.setCountUsers(countUsers);
                resultItem.setCountCourses(countCourses);
            }
            result.add(resultItem);
            fromDate = fromDate.plusDays(1);
        }
        return new CmsGetStatisticResponse(result);
    }

    @Override
    public TeacherGetCardsInfoResponse teacherGetCardsInfo(String teacherId, LocalDate fromDate, LocalDate toDate) {
        return new TeacherGetCardsInfoResponse(statisticRepository.teacherFindCardsInfo(teacherId, fromDate, toDate));
    }

    @Override
    public TeacherGetStatisticResponse teacherGetStatistic(String teacherId, LocalDate fromDate, LocalDate toDate) {
        List<Map<String, Object>> mapList = statisticRepository.teacherGetStatistic(teacherId, fromDate, toDate.plusDays(1));
        Map<String, TeacherStatisticModel> statistics = new HashMap<>();

        for(Map<String, Object> map : mapList) {
            TeacherStatisticModel model = new TeacherStatisticModel(map);
            statistics.put(model.getDate(), model);
        }
        List<TeacherStatisticModel> result = new ArrayList<>();
        while(fromDate.isBefore(toDate) || fromDate.equals(toDate)) {
            TeacherStatisticModel resultItem = new TeacherStatisticModel();
            if (statistics.containsKey(fromDate.toString())) {
                resultItem = statistics.get(fromDate.toString());
            } else {
                resultItem.setDate(fromDate.toString());
                resultItem.setRevenue(0L);
            }
            result.add(resultItem);
            fromDate = fromDate.plusDays(1);
        }
        return new TeacherGetStatisticResponse(result);
    }
}
