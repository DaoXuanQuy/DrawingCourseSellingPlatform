package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.CmsGetCoursesRequest;
import vn.fpt.elearning.dtos.course.response.GetListCoursesResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.specifications.CourseSpecification;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class CmsGetCourseHandler extends RequestHandler<CmsGetCoursesRequest, GetListCoursesResponse> {
    private final CourseSpecification courseSpecification;
    private final ICourseService courseService;
    private final ICourseMapper courseMapper;

    @Override
    public GetListCoursesResponse handle(CmsGetCoursesRequest request) {
        Specification<Course> specification = Specification.where(courseSpecification.likeCourseName(request.getCourseName()))
                .and(courseSpecification.equalCourseId(request.getCourseId()))
                .and(courseSpecification.gteCreateFrom(request.fromDatetime(request.getFromDate())))
                .and(courseSpecification.lteCreateTo(request.toDatetime(request.getToDate())))
                .and(courseSpecification.equalStatus(request.getStatus()))
                .and(courseSpecification.equalApproveStatus(request.getApproveStatus()))
                .and(courseSpecification.byUser(request.getIdUser()));
        Page<Course> courses = courseService.getListCourses(specification, request.getPageable());

        List<CourseDto> courseDtoList = new ArrayList<>();
        courses.getContent().forEach(course -> {
            CourseDto courseDto = courseMapper.toCourseDto(course);
            courseDtoList.add(courseDto);
        });
        return new GetListCoursesResponse(courseDtoList, new Paginate(courses));
    }
}
