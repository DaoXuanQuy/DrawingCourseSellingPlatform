package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.lesson.request.CreateLessonRequest;
import vn.fpt.elearning.dtos.lesson.request.DisplayLessonRequest;
import vn.fpt.elearning.dtos.lesson.request.UpdateLessonRequest;
import vn.fpt.elearning.dtos.lesson.response.GetLessonByCourseResponse;
import vn.fpt.elearning.dtos.lesson.response.LessonResponse;

import javax.validation.Valid;

@Tag(name = "Lesson Controller")
@RequestMapping("/api/lesson")
public interface ILessonController {
    @Operation(
        summary = "[Teacher]Lấy tất cả bài học theo khóa học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/teacher/v1/course/{courseId}")
    ResponseEntity<ResponseBase<GetLessonByCourseResponse>> getLessonsByCourse(@PathVariable(name = "courseId") String courseId);

    @Operation(
        summary = "Tạo một bài học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/teacher/v1/create")
    ResponseEntity<ResponseBase<LessonResponse>> createLesson(@RequestBody @Valid CreateLessonRequest request);

    @Operation(
        summary = "Chỉnh sửa bài học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/teacher/v1/update")
    ResponseEntity<ResponseBase<LessonResponse>> updateLesson(@RequestBody @Valid UpdateLessonRequest request);

    @Operation(
        summary = "Xóa bài học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @DeleteMapping("/teacher/v1/delete/{id}")
    ResponseEntity<ResponseBase<StatusResponse>> deleteLesson(@PathVariable String id);

    @Operation(
            summary = "Ẩn/hiện bài học",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/teacher/v1/display")
    ResponseEntity<ResponseBase<StatusResponse>> displayLesson(@RequestBody @Valid DisplayLessonRequest request);

    @Operation(
        summary = "[Student]Lấy tất cả bài học theo khóa học",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/v1/course/{courseId}")
    ResponseEntity<ResponseBase<GetLessonByCourseResponse>> studentGetLessonsByCourse(@PathVariable(name = "courseId") String courseId);
}
