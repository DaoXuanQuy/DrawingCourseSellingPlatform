package vn.fpt.elearning.handler.lesson;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.lesson.request.DeleteLessonRequest;
import vn.fpt.elearning.entity.Lesson;
import vn.fpt.elearning.service.interfaces.ILessonService;

@Component
@RequiredArgsConstructor
@Slf4j
public class DeleteLessonHandler extends RequestHandler<DeleteLessonRequest, StatusResponse> {
    private final ILessonService lessonService;
    @Override
    public StatusResponse handle(DeleteLessonRequest request) {
        Lesson lesson = lessonService.getById(request.getId());
        lessonService.deleteById(lesson.getId());
        return new StatusResponse(true);
    }
}
