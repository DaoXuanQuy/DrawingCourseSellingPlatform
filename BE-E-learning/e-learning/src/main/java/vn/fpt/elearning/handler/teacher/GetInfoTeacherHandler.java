package vn.fpt.elearning.handler.teacher;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.teacher.request.GetInfoTeacherRequest;
import vn.fpt.elearning.dtos.teacher.response.GetInfoTeacherResponse;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.ITeacherMapper;
import vn.fpt.elearning.model.teacher.TeacherDto;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ITeacherService;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetInfoTeacherHandler extends RequestHandler<GetInfoTeacherRequest, GetInfoTeacherResponse> {
    private final ITeacherService teacherService;
    private final ITeacherMapper teacherMapper;

    @Override
    public GetInfoTeacherResponse handle(GetInfoTeacherRequest request) {
        Teacher teacher = teacherService.getByUserId(request.getUserId());
        if (teacher == null) {
            throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
        }
        TeacherDto teacherDto = teacherMapper.toTeacherDto(teacher);
        return new GetInfoTeacherResponse(teacherDto);
    }
}
