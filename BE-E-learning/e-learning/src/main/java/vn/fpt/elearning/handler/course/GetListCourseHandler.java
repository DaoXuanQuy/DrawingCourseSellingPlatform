package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.GetListCoursesRequest;
import vn.fpt.elearning.dtos.course.response.GetListCoursesResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ApproveStatus;
import vn.fpt.elearning.enums.CourseStatus;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.specifications.CourseSpecification;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GetListCourseHandler extends RequestHandler<GetListCoursesRequest, GetListCoursesResponse> {

    private final CourseSpecification courseSpecification;

    private final ICourseService courseService;
    private final ICourseMapper courseMapper;

    @Override
    public GetListCoursesResponse handle(GetListCoursesRequest request) {
        Specification<Course> specification = Specification.where(courseSpecification.likeCourseName(request.getCourseName()))
                .and(courseSpecification.gteCreateFrom(request.fromDatetime(request.getFromDate())))
                .and(courseSpecification.lteCreateTo(request.toDatetime(request.getToDate())))
                .and(courseSpecification.equalStatus(CourseStatus.ACTIVE))
                .and(courseSpecification.equalApproveStatus(ApproveStatus.APPROVE));
        Page<Course> courseEntityPage = courseService.getListCourses(specification, request.getPageable());

        List<CourseDto> courseDtoList = new ArrayList<>();
        courseEntityPage.get().forEach(course -> {
            CourseDto courseDto = courseMapper.toCourseDto(course);
            courseDto.setCurrentPrice(course.getPrice() * (100 - course.getDiscountPercentage()) / 100);
            courseDtoList.add(courseDto);
        });
        return new GetListCoursesResponse(courseDtoList, new Paginate(courseEntityPage));
    }
}
