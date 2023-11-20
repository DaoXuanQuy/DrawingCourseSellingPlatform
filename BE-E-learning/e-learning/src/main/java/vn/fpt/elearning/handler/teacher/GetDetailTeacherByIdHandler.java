package vn.fpt.elearning.handler.teacher;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.teacher.request.GetDetailTeacherByIdRequest;
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
public class GetDetailTeacherByIdHandler extends RequestHandler<GetDetailTeacherByIdRequest, GetInfoTeacherResponse> {
    private final ITeacherService iTeacherService;
    private final ITeacherMapper teacherMapper;

    @Override
    public GetInfoTeacherResponse handle(GetDetailTeacherByIdRequest request) {
        Teacher teacher = iTeacherService.getById(request.getId());
        if (teacher == null) {
            throw new InternalException(ResponseCode.TEACHER_NOT_FOUND);
        }
        TeacherDto teacherDto = teacherMapper.toTeacherDto(teacher);
        return new GetInfoTeacherResponse(teacherDto);
    }
}
