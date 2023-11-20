package vn.fpt.elearning.handler.statistic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.statistic.request.TeacherGetStatisticRequest;
import vn.fpt.elearning.dtos.statistic.response.TeacherGetStatisticResponse;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IStatisticService;
import vn.fpt.elearning.service.interfaces.IUserService;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class TeacherGetStatisticHandler extends RequestHandler<TeacherGetStatisticRequest, TeacherGetStatisticResponse> {

    private final IStatisticService statisticService;
    private final IUserService userService;
    @Override
    public TeacherGetStatisticResponse handle(TeacherGetStatisticRequest request) {
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            throw new InternalException(ResponseCode.USER_NOT_FOUND);
        }
        Teacher teacher = user.getTeacher();
        if (teacher == null) {
            throw new InternalException(ResponseCode.USER_INVALID);
        }
        if (request.getFromDate() == null && request.getToDate() == null) {
            LocalDate now = LocalDate.now();
            request.setToDate(now);
            request.setFromDate(LocalDate.of(now.getYear(), now.getMonth(), 1));
        } else if (request.getFromDate() == null) {
            request.setFromDate(request.getToDate().minusDays(30));
        } else if (request.getToDate() == null) {
            request.setToDate(LocalDate.now());
        }
        return statisticService.teacherGetStatistic(teacher.getId(), request.getFromDate(), request.getToDate());
    }
}
