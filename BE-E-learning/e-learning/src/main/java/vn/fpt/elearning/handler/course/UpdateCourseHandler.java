package vn.fpt.elearning.handler.course;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.course.request.UpdateCourseRequest;
import vn.fpt.elearning.dtos.course.response.UpdateCourseResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.mapper.ICourseMapper;
import vn.fpt.elearning.model.course.CourseDto;
import vn.fpt.elearning.utils.CommonUtils;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.MinIOService;
import vn.fpt.elearning.service.interfaces.ICourseService;

@Component
@RequiredArgsConstructor
@Slf4j
public class UpdateCourseHandler extends RequestHandler<UpdateCourseRequest, UpdateCourseResponse> {

    private final ICourseService courseService;
    private final MinIOService minIOService;
    private final ICourseMapper courseMapper;

    @Override
    public UpdateCourseResponse handle(UpdateCourseRequest request) {
        Course course = courseService.getCourseById(request.getId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        MultipartFile courseImage = request.getCourseImage();
        if (courseImage != null) {
            String objectName = CommonUtils.fileNameTimestamp(courseImage.getOriginalFilename());
            try {
                objectName = minIOService.uploadFile(objectName, courseImage.getBytes(), courseImage.getContentType(), true);
            } catch (Exception ex) {
                log.error("upload file to service minio error: {}", ex.getMessage());
            }
            course.setImageUrl(objectName);
        }
        course.setCourseName(request.getCourseName());
        course.setDescription(request.getDescription());
        course.setPrice(request.getPrice());
        if (request.getDiscountPercentage() != null) {
            course.setDiscountPercentage(request.getDiscountPercentage());
        }
        Course courseSave = courseService.save(course);

        CourseDto courseDto = courseMapper.toCourseDto(courseSave);
        courseDto.setCurrentPrice(course.getPrice() * (100 - course.getDiscountPercentage()) / 100);
        return new UpdateCourseResponse(courseDto);
    }
}
