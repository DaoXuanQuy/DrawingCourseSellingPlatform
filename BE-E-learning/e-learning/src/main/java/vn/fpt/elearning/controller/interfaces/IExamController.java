package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.exam.request.AddExamRequest;
import vn.fpt.elearning.dtos.exam.request.GetExamByLessonRequest;
import vn.fpt.elearning.dtos.exam.request.StudentGetExamByLessonRequest;
import vn.fpt.elearning.dtos.exam.request.UpdateExamRequest;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.dtos.exam.response.GetExamByLessonResponse;

import javax.validation.Valid;
import java.security.Principal;

@RequestMapping("/api/exam")
@Tag(name = "Exam controller", description = "Api về bài kiểm tra của khóa học")
public interface IExamController {
    @Operation(
        summary = "Lấy chi tiết bài kiểm tra",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/v1/detail/{id}")
    ResponseEntity<ResponseBase<ExamResponse>> getDetailExam(@PathVariable(name = "id") String id);
    @Operation(
        summary = "Tạo bài kiểm tra",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/teacher/v1/create")
    ResponseEntity<ResponseBase<ExamResponse>> createExam(@Valid @RequestBody AddExamRequest request);

    @Operation(
        summary = "Cập nhật bài kiểm tra",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/teacher/v1/update")
    ResponseEntity<ResponseBase<ExamResponse>> updateExam(@Valid @RequestBody UpdateExamRequest request);

    @Operation(
        summary = "Xóa bài kiểm tra",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @DeleteMapping("/teacher/v1/delete/{id}")
    ResponseEntity<ResponseBase<StatusResponse>> deleteExam(@PathVariable(name = "id") String id);

    @GetMapping("/teacher/v1/byLesson")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetExamByLessonResponse>> getExamByLesson(@ParameterObject GetExamByLessonRequest request,
                                                                          @ParameterObject Pageable pageable, Principal principal);
    @GetMapping("/v1/byLesson")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetExamByLessonResponse>> studentGetExamByLesson(@ParameterObject StudentGetExamByLessonRequest request,
                                                                                 @ParameterObject Pageable pageable, Principal principal);
    @GetMapping("/v1/teacher/detail/{id}")
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    ResponseEntity<ResponseBase<ExamResponse>> teacherGetDetailExam(@PathVariable(name = "id") String id);

}
