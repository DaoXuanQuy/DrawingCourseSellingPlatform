package vn.fpt.elearning.controller.interfaces;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.address.request.GetDistrictsByProvinceRequest;
import vn.fpt.elearning.dtos.address.request.GetDistrictsByProvinceV2Request;
import vn.fpt.elearning.dtos.address.request.GetWardsByDistrictRequest;
import vn.fpt.elearning.dtos.address.request.GetWardsByDistrictV2Request;
import vn.fpt.elearning.dtos.address.response.*;

import javax.validation.Valid;

@RequestMapping(value = "/api/address")
@Tag(name = "Address controller", description = "Address controller")
public interface IAddressController {
    @GetMapping("/v1/getAll")
    @Operation(
        summary = "Hiển thị tất cả tỉnh thành, quận huyện, xã phường",
        deprecated = true
    )
    ResponseEntity<ResponseBase<ShowAllResponse>> showAllDivisions();


    @GetMapping("/v1/getAllProvinces")
    @Operation(
        summary = "Lấy tất cả tỉnh thành",
        deprecated = true

    )
    ResponseEntity<ResponseBase<GetAllProvincesResponse>> getAllProvinces();

    @GetMapping("/v1/getDistrictsByProvince")
    @Operation(
        summary = "Lấy quận huyện theo tỉnh thành",
        deprecated = true
    )
    ResponseEntity<ResponseBase<GetDistrictsByProvinceResponse>> getDistrictsByProvince(@ParameterObject @Valid GetDistrictsByProvinceRequest request);

    @GetMapping("/v1/getWardsByDistrict")
    @Operation(
        summary = "Lấy xã phường theo quận huyện",
        deprecated = true
    )
    ResponseEntity<ResponseBase<GetWardsbyDistrictResponse>> getWardsByProvince(@ParameterObject @Valid GetWardsByDistrictRequest request);

    @GetMapping("public/v2/getAllProvinces")
    @Operation(
            summary = "Lấy tất cả tỉnh thành"
    )
    ResponseEntity<ResponseBase<GetAllProvinceV2Response>> getAllProvincesV2();

    @GetMapping("public/v2/getDistrictsByProvince")
    @Operation(
            summary = "Lấy quận huyện theo tỉnh thành"
    )
    ResponseEntity<ResponseBase<GetDistrictsByProvinceV2Response>> getDistrictsByProvinceV2(@ParameterObject @Valid GetDistrictsByProvinceV2Request request);

    @GetMapping("public/v2/getWardsByDistrict")
    @Operation(
        summary = "Lấy xã phường theo quận huyện"
    )
    ResponseEntity<ResponseBase<GetWardsByDistrictV2Response>> getWardsByDistrictV2(@ParameterObject @Valid GetWardsByDistrictV2Request request);
}
