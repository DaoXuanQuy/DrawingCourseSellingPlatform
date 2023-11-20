package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ExamResultStatus;

public interface IExamResultService {
    ExamResult save(ExamResult examResultEntity);

    void deleteExamResultById(String id);

    ExamResult getExamResultById(String id);
    ExamResult getExamResultByExamId(String id);
    ExamResult createOrUpdateIfExist(ExamResult examResultEntity);
    Page<ExamResult> getAll(Specification<ExamResult> spec, Pageable pageable);
    ExamResult getByStudentAndExam(String studentId, String examId);
    int getTestAttempts(String userId, String examId, boolean isTeacher);
    ExamResult getByCodeNotNull(String code);
    ExamResult getByUserAndExamAndScore(String userId, String examId, Double score);
    ExamResult getByUserAndExamAndStatus(String userId, String examId, ExamResultStatus status);
    ExamResult getByCodeAndUserId(String code, String userId);

}
