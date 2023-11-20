package vn.fpt.elearning.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import vn.fpt.elearning.core.BaseController;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.dtos.StatusResponse;
import vn.fpt.elearning.dtos.exam.request.*;
import vn.fpt.elearning.dtos.exam.response.ExamResponse;
import vn.fpt.elearning.dtos.exam.response.GetExamByLessonResponse;
import vn.fpt.elearning.controller.interfaces.IExamController;


import java.security.Principal;

@RestController
public class ExamController extends BaseController implements IExamController {
    @Override
    public ResponseEntity<ResponseBase<ExamResponse>> getDetailExam(String id) {
        GetDetailExamRequest request = new GetDetailExamRequest();
        request.setId(id);
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<ExamResponse>> createExam(AddExamRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<ExamResponse>> updateExam(UpdateExamRequest request) {
        return this.execute(request);
    }

    @Override
    public ResponseEntity<ResponseBase<StatusResponse>> deleteExam(String id) {
        DeleteExamRequest request = new DeleteExamRequest();
        request.setId(id);
        return this.execute(request, StatusResponse.class);
    }
    @Override
    public ResponseEntity<ResponseBase<GetExamByLessonResponse>> getExamByLesson(GetExamByLessonRequest request,
                                                                                 Pageable pageable, Principal principal) {
        request.setPageable(pageable);
        request.setUserId(principal.getName());
        return this.execute(request, GetExamByLessonResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<GetExamByLessonResponse>> studentGetExamByLesson(StudentGetExamByLessonRequest request, Pageable pageable, Principal principal) {
        request.setPageable(pageable);
        request.setUserId(principal.getName());
        return this.execute(request, GetExamByLessonResponse.class);
    }

    @Override
    public ResponseEntity<ResponseBase<ExamResponse>> teacherGetDetailExam(String id) {
        TeacherGetDetailExamRequest request = new TeacherGetDetailExamRequest();
        request.setId(id);
        return this.execute(request);
    }
}
