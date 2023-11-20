package vn.fpt.elearning.controller;

import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.course.request.*;
import vn.fpt.elearning.dtos.course.response.*;
import vn.fpt.elearning.dtos.user.request.GetUnregisterCourseRequest;
import vn.fpt.elearning.dtos.user.response.GetUnregisterCourseResponse;
import vn.fpt.elearning.controller.interfaces.ICourseController;


import java.security.Principal;

@RestController
public class CourseController extends BaseController implements ICourseController {
    @Override
    public ResponseEntity<ResponseBase<GetListCoursesResponse>> getListCourses(GetListCoursesRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request, GetListCoursesResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetDetailCourseResponse>> getDetailCourse(String id) {
        GetDetailCourseRequest request = new GetDetailCourseRequest(id);
        return this.execute(request, GetDetailCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<CreateCourseResponse>> createCourse(CreateCourseRequest request) {
        return this.execute(request, CreateCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<UpdateCourseResponse>> updateCourse(UpdateCourseRequest request) {
        return this.execute(request, UpdateCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<SettingCourseResponse>> settingCourse(SettingCourseRequest request) {
        return this.execute(request, SettingCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<CmsGetDetailCourseResponse>> cmsGetDetailById(String id) {
        return this.execute(new CmsGetCourseDetailRequest(id));
    }

    @Override
    public ResponseEntity<ResponseBase<BlockCourseResponse>> blockCourse(String id) {
        BlockCourseRequest request = new BlockCourseRequest();
        request.setId(id);
        return this.execute(request, BlockCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<UnblockCourseResponse>> unblockCourse(String id) {
        return this.execute(new UnBlockCourseRequest(id), UnblockCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> approveCourse(String id) {
        return this.execute(new ApproveCourseRequest(id), StatusResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> rejectedCourse(String id) {
        return this.execute(new RejectedCourseRequest(id), StatusResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<RegisterCourseResponse>> registerCourse(RegisterCourseRequest request, Principal principal) {
        request.setUserId(principal.getName());
        return this.execute(request, RegisterCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetUsersByCourseResponse>> getUsersByCourse(String courseId, Pageable pageable, Principal principal) {
        GetUsersByCourseRequest request = new GetUsersByCourseRequest();
        request.setCourseId(courseId);
        request.setPageable(pageable);
        request.setUserId(principal.getName());
        return this.execute(request, GetUsersByCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetListCoursesResponse>> teacherGetCourses(TeacherGetCoursesRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request, GetListCoursesResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetListCoursesResponse>> cmsGetCourses(CmsGetCoursesRequest request, Pageable pageable) {
        request.setPageable(pageable);
        return this.execute(request, GetListCoursesResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetUnregisterCourseResponse>> getUnregisterCourse(Pageable pageable, Principal principal) {
        GetUnregisterCourseRequest request = new GetUnregisterCourseRequest(pageable);
        request.setUserId(principal.getName());
        return this.execute(request, GetUnregisterCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<ReviewCourseResponse>> reviewCourse(String id) {
        return this.execute(new ReviewCourseRequest(id));
    }

    @Override
    public ResponseEntity<ResponseBase<GetCourseByUserIdResponse>> getCourse(@ParameterObject Pageable pageable, Principal principal) {
        GetCourseByUserIdRequest request = new GetCourseByUserIdRequest(pageable);
        request.setUserId(principal.getName());
        return this.execute(request, GetCourseByUserIdResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<UpdateCourseResponse>> setDiscountPercentage(SetDiscountPercentageRequest request) {
        return this.execute(request, UpdateCourseResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> increaseProgress(IncreaseProgressRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> decreaseProgress(DecreaseProgressRequest request) {
        return this.execute(request);
    }
}
