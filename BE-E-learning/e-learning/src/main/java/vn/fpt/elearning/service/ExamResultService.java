package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ExamResultStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.repository.ExamResultRepository;
import vn.fpt.elearning.service.interfaces.IExamResultService;

@Service
@RequiredArgsConstructor
public class ExamResultService implements IExamResultService {

    private final ExamResultRepository examResultRepository;

    @Override
    public ExamResult save(ExamResult examResultEntity) {
        return examResultRepository.save(examResultEntity);
    }

    @Override
    public void deleteExamResultById(String id) {
        examResultRepository.deleteById(id);
    }

    @Override
    public ExamResult getExamResultById(String id) {
        return examResultRepository.findById(id).orElse(null);
    }

    @Override
    public ExamResult getExamResultByExamId(String id) {
        return examResultRepository.findByExamId(id);
    }

    @Override
    public ExamResult createOrUpdateIfExist(ExamResult examResultEntity) {
//        ExamResult examResult = examResultRepository.findByExamId(examResultEntity.getExam().getId());
//        if (examResult == null) {
//            examResult = examResultEntity;
//        } else {
//            examResult.setScore(examResultEntity.getScore());
//            examResult.setCorrectTotal(examResultEntity.getCorrectTotal());
//        }
//        return examResultRepository.save(examResult);
        return null;
    }

    @Override
    public Page<ExamResult> getAll(Specification<ExamResult> spec, Pageable pageable) {
        return examResultRepository.findAll(spec, pageable);
    }

    @Override
    public ExamResult getByStudentAndExam(String studentId, String examId) {
        return examResultRepository.studentFindFirstByUserIdAndExamId(studentId, examId);
    }

    @Override
    public int getTestAttempts(String userId, String examId, boolean isTeacher) {
        if (isTeacher) {
            return examResultRepository.countByExamId(examId);
        }
        return examResultRepository.countByUserIdAndExamId(userId, examId);
    }

    @Override
    public ExamResult getByCodeNotNull(String code) {
        return examResultRepository.findByCode(code)
            .orElseThrow(() -> new InternalException(ResponseCode.EXAM_RESULT_NOT_FOUND));
    }

    @Override
    public ExamResult getByUserAndExamAndScore(String userId, String examId, Double score) {
        return examResultRepository.findByUserIdAndExamIdAndScore(userId, examId, score).orElse(null);
    }

    @Override
    public ExamResult getByUserAndExamAndStatus(String userId, String examId, ExamResultStatus status) {
        return examResultRepository.findByUserIdAndExamIdAndStatus(userId, examId, status).orElse(null);
    }

    @Override
    public ExamResult getByCodeAndUserId(String code, String userId) {
        return examResultRepository.findByCodeAndUserId(code, userId).orElse(null);
    }


}
