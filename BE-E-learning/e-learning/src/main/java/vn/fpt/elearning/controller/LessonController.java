package vn.fpt.elearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.lesson.request.*;
import vn.fpt.elearning.dtos.lesson.response.GetLessonByCourseResponse;
import vn.fpt.elearning.dtos.lesson.response.LessonResponse;
import vn.fpt.elearning.controller.interfaces.ILessonController;

@RestController
public class LessonController extends BaseController implements ILessonController {

    @Override
    public ResponseEntity<ResponseBase<GetLessonByCourseResponse>> getLessonsByCourse(String courseId) {
        return this.execute(new GetLessonByCourseRequest(courseId));
    }

    @Override
    public ResponseEntity<ResponseBase<LessonResponse>> createLesson(CreateLessonRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<LessonResponse>> updateLesson(UpdateLessonRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteLesson(String id) {
        return this.execute(new DeleteLessonRequest(id));
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> displayLesson(DisplayLessonRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<GetLessonByCourseResponse>> studentGetLessonsByCourse(String courseId) {
        return this.execute(new StudentGetLessonByCourseRequest(courseId));
    }
}
