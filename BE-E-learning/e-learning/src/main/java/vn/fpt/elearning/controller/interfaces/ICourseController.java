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
import vn.fpt.elearning.dtos.course.request.*;
import vn.fpt.elearning.dtos.course.response.*;
import vn.fpt.elearning.dtos.user.response.GetUnregisterCourseResponse;


import javax.validation.Valid;
import java.security.Principal;

@RequestMapping("/api/course")
@Tag(name = "Course controller", description = "Api về khóa học")
public interface ICourseController {

    @GetMapping("/v1/courses")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetListCoursesResponse>> getListCourses(@ParameterObject GetListCoursesRequest request,
                                                                        @ParameterObject Pageable pageable);

    @GetMapping("/v1/detail/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetDetailCourseResponse>> getDetailCourse(@PathVariable(name = "id") String id);

    @PostMapping(value = "/teacher/v1/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<CreateCourseResponse>> createCourse(@Valid @ModelAttribute CreateCourseRequest request);

    @PutMapping(value = "/teacher/v1/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UpdateCourseResponse>> updateCourse(@Valid @ModelAttribute UpdateCourseRequest request);

    @PutMapping(value = "/teacher/v1/setting")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<SettingCourseResponse>> settingCourse(@Valid @RequestBody SettingCourseRequest request);

    @GetMapping("/cms/v1/getDetail/{id}")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<CmsGetDetailCourseResponse>> cmsGetDetailById(@PathVariable String id);

    @PutMapping("/cms/v1/block/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<BlockCourseResponse>> blockCourse(@PathVariable(name = "id") String id);

    @PutMapping("/cms/v1/unblock/{id}")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<UnblockCourseResponse>> unblockCourse(@PathVariable(name = "id") String id);

    @PutMapping("/cms/v1/approve/{id}")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> approveCourse(@PathVariable(name = "id") String id);

    @PutMapping("/cms/v1/rejected/{id}")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<StatusResponse>> rejectedCourse(@PathVariable(name = "id") String id);


    @PostMapping("/portal/v1/register")
    @Operation(
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<RegisterCourseResponse>> registerCourse(@RequestBody RegisterCourseRequest request, Principal principal);

    @GetMapping("/v1/getUsersByCourse")
    @Operation(
            summary = "Lấy danh sách học viên theo khóa học",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetUsersByCourseResponse>> getUsersByCourse(@RequestParam String courseId, @ParameterObject Pageable pageable, Principal principal);

    @GetMapping("/teacher/courses")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetListCoursesResponse>> teacherGetCourses(@ParameterObject TeacherGetCoursesRequest request, @ParameterObject Pageable pageable);

    @GetMapping("/cms/courses")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetListCoursesResponse>> cmsGetCourses(@ParameterObject CmsGetCoursesRequest request, @ParameterObject Pageable pageable);

    @GetMapping("/v1/getUnregisterCourse")
    @Operation(
        summary = "Lấy các khóa học chưa đăng ký",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetUnregisterCourseResponse>> getUnregisterCourse(@ParameterObject Pageable pageable, Principal principal);

    @Operation(summary = "Tham quan khóa học")
    @GetMapping("/public/v1/review/{id}")
    ResponseEntity<ResponseBase<ReviewCourseResponse>> reviewCourse(@PathVariable String id);

    @GetMapping("/portal/v1/course")
    @Operation(
        security = @SecurityRequirement(name = "bearerAuth")
    )
    ResponseEntity<ResponseBase<GetCourseByUserIdResponse>> getCourse(Pageable pageable, Principal principal);

    @PutMapping("/teacher/v1/setDiscountPercentage")
    @Operation(summary = "Chỉnh sửa giảm giá khóa học", security = @SecurityRequirement(name = "bearerAuth"))
    ResponseEntity<ResponseBase<UpdateCourseResponse>> setDiscountPercentage(@Valid @RequestBody SetDiscountPercentageRequest request);

    @PostMapping("/v1/increase-progress")
    @Operation(summary = "tăng tiến độ khóa học", security = @SecurityRequirement(name = "bearerAuth"))
    ResponseEntity<ResponseBase<StatusResponse>> increaseProgress(@Valid @RequestBody IncreaseProgressRequest request);

    @DeleteMapping("/v1/decrease-progress")
    @Operation(summary = "Giảm tiến độ khóa học", security = @SecurityRequirement(name = "bearerAuth"))
    ResponseEntity<ResponseBase<StatusResponse>> decreaseProgress(@Valid @RequestBody DecreaseProgressRequest request);


}
