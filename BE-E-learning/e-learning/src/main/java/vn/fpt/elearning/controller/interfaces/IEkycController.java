package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.ekyc.request.DetectIdCardRequest;
import vn.fpt.elearning.dtos.ekyc.request.UpdateEkycRequest;
import vn.fpt.elearning.dtos.ekyc.response.DetectIdCardResponse;
import vn.fpt.elearning.dtos.ekyc.response.UpdateEkycResponse;

import javax.validation.Valid;

@RequestMapping("/api/ekyc")
public interface IEkycController {

    @PostMapping(value = "/portal/v1/ocr", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<DetectIdCardResponse>> detectIdCard(@ModelAttribute @Valid DetectIdCardRequest request);

    @PutMapping("/portal/v1/update")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UpdateEkycResponse>> updateEkyc(@RequestBody UpdateEkycRequest request);
}
