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
import vn.fpt.elearning.dtos.exam_result.request.AddExamResultRequest;
import vn.fpt.elearning.dtos.exam_result.request.GetUngradedExamsRequest;
import vn.fpt.elearning.dtos.exam_result.request.UpdateExamResultRequest;
import vn.fpt.elearning.dtos.exam_result.response.*;


import javax.validation.Valid;

@RequestMapping("/api/exam-result")
@Tag(name = "Exam result controller", description = "Kết qủa bài kiêm tra")
public interface IExamResultController {
    @GetMapping("/teacher/v1/detail/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )  ResponseEntity<ResponseBase<GetDetailExamResultResponse>> getDetailExamResult(@PathVariable(name = "id") String id);

    @PostMapping("/teacher/v1/create")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )  ResponseEntity<ResponseBase<AddExamResultResponse>> createExam(@Valid @RequestBody AddExamResultRequest request);

    @PutMapping("/teacher/v1/update")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )  ResponseEntity<ResponseBase<UpdateExamResultResponse>> updateExam(@Valid @RequestBody UpdateExamResultRequest request);

    @DeleteMapping("/teacher/v1/delete/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )  ResponseEntity<ResponseBase<StatusResponse>> deleteExam(@PathVariable(name = "id") String id);
    @GetMapping("/teacher/v1/{examId}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    ) ResponseEntity<ResponseBase<GetExamResultByExamIdResponse>> getByExamId(@PathVariable(name = "examId") String examId, @ParameterObject Pageable pageable);

    @GetMapping("v1/{examId}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    ) ResponseEntity<ResponseBase<GetDetailExamResultResponse>> getExamResult(@PathVariable(name = "examId") String examId);

    @GetMapping("/teacher/v1/get-ungraded-exams")
    @Operation(summary = "Lấy danh sách bài kiểm tra chưa chấm điểm", security = @SecurityRequirement(name = "bearerAuth"))
    ResponseEntity<ResponseBase<GetUngradedExamsResponse>> getUngradedExams(@ParameterObject @Valid GetUngradedExamsRequest request, @ParameterObject Pageable pageable);


}
