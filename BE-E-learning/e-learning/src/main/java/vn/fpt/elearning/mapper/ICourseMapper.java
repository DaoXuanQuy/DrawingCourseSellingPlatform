package vn.fpt.elearning.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.model.course.CourseDto;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING
)
public interface ICourseMapper {
    CourseDto toCourseDto(Course course);
}
