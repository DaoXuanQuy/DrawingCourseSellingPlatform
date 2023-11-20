package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.document.request.AddDocumentRequest;
import vn.fpt.elearning.dtos.document.request.DisplayDocumentRequest;
import vn.fpt.elearning.dtos.document.request.GetLIstDocumentRequest;
import vn.fpt.elearning.dtos.document.request.UpdateDocumentRequest;
import vn.fpt.elearning.dtos.document.response.AddDocumentResponse;
import vn.fpt.elearning.dtos.document.response.GetDetailDocumentResponse;
import vn.fpt.elearning.dtos.document.response.GetListDocumentResponse;
import vn.fpt.elearning.dtos.document.response.UpdateDocumentResponse;

import javax.validation.Valid;

@RequestMapping("/api/document")
@Tag(name = "Document controller", description = "Api về tài liệu của khóa học")
public interface IDocumentController {
    @GetMapping("/v1/detail/{id}")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetDetailDocumentResponse>> getDetailDocument(@PathVariable(name = "id") String id);

    @PostMapping(value = "/v1/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<AddDocumentResponse>> createDocument(@Valid @ModelAttribute AddDocumentRequest request);

    @PutMapping(value = "/v1/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UpdateDocumentResponse>> updateDocument(@Valid @ModelAttribute UpdateDocumentRequest request);

    @DeleteMapping("/v1/delete/{id}")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> deleteDocument(@PathVariable(name = "id") String id);

    @GetMapping("/teacher/v1/getList")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetListDocumentResponse>> getDocuments(@ParameterObject GetLIstDocumentRequest request);

    @PutMapping("/teacher/v1/display")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> displayDocument(@RequestBody @Valid DisplayDocumentRequest request);

    @GetMapping("/portal/v1/getDocuments/{lessonId}")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetListDocumentResponse>> getDocumentForStudent(@PathVariable String lessonId);

}
//public void Create(Member member)
{
    AssSalesContext.Instance.Add(member);
    AssSalesContext.Instance.SaveChanges();
}
