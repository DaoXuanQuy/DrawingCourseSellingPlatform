package vn.fpt.elearning.handler.lesson;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.lesson.request.GetLessonByCourseRequest;
import vn.fpt.elearning.dtos.lesson.response.GetLessonByCourseResponse;
import vn.fpt.elearning.dtos.lesson.response.LessonResponse;
import vn.fpt.elearning.entity.Course;
import vn.fpt.elearning.entity.Lesson;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ICourseService;
import vn.fpt.elearning.service.interfaces.ILessonService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetLessonsByCourseHandler extends RequestHandler<GetLessonByCourseRequest, GetLessonByCourseResponse> {

    private final ILessonService lessonService;
    private final ICourseService courseService;

    @Override
    public GetLessonByCourseResponse handle(GetLessonByCourseRequest request) {
        Course course = courseService.getByTeacherOrUser(request.getCourseId(), request.getUserId());
        if (course == null) {
            throw new InternalException(ResponseCode.COURSE_NOT_FOUND);
        }
        List<Lesson> lessonPage = lessonService.getLessonsByCourse(request.getCourseId());
        List<LessonResponse> lessonResponseList = lessonPage.stream().map(LessonResponse::new).collect(Collectors.toList());
        return new GetLessonByCourseResponse(lessonResponseList);
    }
}

