package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.question.request.*;
import vn.fpt.elearning.dtos.question.response.CreateQuestionFromExcelResponse;
import vn.fpt.elearning.dtos.question.response.DeleteQuestionResponse;
import vn.fpt.elearning.dtos.question.response.GetQuestionResponse;
import vn.fpt.elearning.dtos.question.response.QuestionResponse;

@RequestMapping("/api/question")
@Tag(name = "Question controller", description = "Question Controller")
public interface IQuestionController {
    @PostMapping("/teacher/v1")
    @Operation(
        summary = "Tạo câu hỏi",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<QuestionResponse>> createQuestion(@RequestBody CreateQuestionRequest request);

    @PostMapping("/teacher/v1/createList")
    @Operation(
        summary = "Tạo theo list câu hỏi",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> createListQuestion(@RequestBody CreateListQuestionRequest request);

    @PostMapping(value = "/v1/using-excel", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
        summary = "tạo câu hỏi bằng file excel",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<CreateQuestionFromExcelResponse>> createQuestionUsingExcel(@ModelAttribute CreateQuestionFromExcelRequest request);

    @PutMapping("/teacher/v1")
    @Operation(
        summary = "Cập nhật câu hỏi",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<QuestionResponse>> updateQuestion(@RequestBody UpdateQuestionRequest request);

    @DeleteMapping("/teacher/v1/question/{id}")
    @Operation(
        summary = "Xóa câu hỏi",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<DeleteQuestionResponse>> deleteQuestionById(@PathVariable("id") String id);

    @DeleteMapping("/teacher/v1/{examId}")
    @Operation(
        summary = "Xóa câu hỏi theo bài kiểm tra",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<DeleteQuestionResponse>> deleteQuestionByExamId(@PathVariable("examId") String examId);

    @GetMapping("/teacher/v1")
    @Operation(
        summary = "Giảng viên lấy câu hỏi theo bài kiểm tra",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetQuestionResponse>> getQuestionByExamId(@ParameterObject GetQuestionRequest request,
                                                                          @ParameterObject Pageable pageable);

    @GetMapping("/v1")
    @Operation(
        summary = "Học viên lấy câu hỏi theo bài kiểm tra",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetQuestionResponse>> studentGetQuestionByExamId(@ParameterObject StudentGetQuestionsRequest request,
                                                                                 @ParameterObject Pageable pageable);
}
