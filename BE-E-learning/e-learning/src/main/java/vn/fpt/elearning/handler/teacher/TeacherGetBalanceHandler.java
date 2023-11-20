package vn.fpt.elearning.handler.teacher;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.teacher.request.TeacherGetBalanceRequest;
import vn.fpt.elearning.dtos.teacher.response.TeacherGetBalanceResponse;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ITeacherService;


@Component
@RequiredArgsConstructor
public class TeacherGetBalanceHandler extends RequestHandler<TeacherGetBalanceRequest, TeacherGetBalanceResponse> {
    private final ITeacherService teacherService;

    @Override
    public TeacherGetBalanceResponse handle(TeacherGetBalanceRequest request) {
        Teacher teacher = teacherService.getByUserId(request.getUserId());
        if (teacher == null) {
            throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
        }
        return new TeacherGetBalanceResponse(teacher.getBalance());
    }
}
