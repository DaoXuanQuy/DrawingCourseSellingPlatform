package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.file_storage.request.MultiUploadRequest;
import vn.fpt.elearning.dtos.file_storage.request.PreviewRequest;
import vn.fpt.elearning.dtos.file_storage.request.UploadFileRequest;
import vn.fpt.elearning.dtos.file_storage.response.MultiUploadResponse;
import vn.fpt.elearning.dtos.file_storage.response.UploadFileResponse;

import javax.validation.Valid;

@RequestMapping("api/file")
@Tag(name = "File storage controller", description = "File storage controller")
public interface IFileStorageController {

    @PostMapping(value = "/v1/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UploadFileResponse>> upload(@ModelAttribute UploadFileRequest request);


    @PostMapping(value = "/v1/multiUpload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<MultiUploadResponse>> multiUpload(@ModelAttribute MultiUploadRequest request);

    @GetMapping(value = "/v1/preview")
    ResponseEntity<ByteArrayResource> preview(@ParameterObject @Valid PreviewRequest request);
}
