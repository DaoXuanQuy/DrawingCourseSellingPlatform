package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.answer.request.GetSubmitAnswerByExamResultRequest;
import vn.fpt.elearning.dtos.answer.request.StartDoExamRequest;
import vn.fpt.elearning.dtos.answer.request.SubmitAnswersRequest;
import vn.fpt.elearning.dtos.answer.response.GetCurrentAnswerResponse;
import vn.fpt.elearning.dtos.answer.response.GetSubmitAnswerByExamResultResponse;
import vn.fpt.elearning.dtos.answer.response.StartDoExamResponse;
import vn.fpt.elearning.dtos.answer.response.SubmitAnswersResponse;

import javax.validation.Valid;

@Tag(name = "Answer Controller")
@RequestMapping("/api/answer")
public interface IAnswerController {
    @MessageMapping("/send-answers")
    void cacheAnswers(@Payload SubmitAnswersRequest request);
    @Operation(
        summary = "Nộp kết quả làm exam",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/v1/submitAnswers")
    ResponseEntity<ResponseBase<SubmitAnswersResponse>> submitAnswers(@Valid  @RequestBody SubmitAnswersRequest request);

    @Operation(summary = "Xem bài làm", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/v1/review")
    ResponseEntity<ResponseBase<GetSubmitAnswerByExamResultResponse>> getSubmitAnswerByExamResult(@ParameterObject @Valid GetSubmitAnswerByExamResultRequest request, @ParameterObject Pageable pageable);

    @Operation(summary = "Bắt đầu làm bài", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/v1/start")
    ResponseEntity<ResponseBase<StartDoExamResponse>> startDoExam(@RequestBody @Valid StartDoExamRequest request);

    @Operation(summary = "Lấy danh sách câu trả lời của bài thi đang làm", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/v1/getCurrentAnswers/{code}")
    ResponseEntity<ResponseBase<GetCurrentAnswerResponse>> getCurrentAnswers(@PathVariable String code);


}
