package vn.fpt.elearning.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.model.teacher.TeacherDto;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface ITeacherMapper {
    TeacherDto toTeacherDto(Teacher teacher);

    List<TeacherDto> toListTeacherDto(List<Teacher> teachers);
}
