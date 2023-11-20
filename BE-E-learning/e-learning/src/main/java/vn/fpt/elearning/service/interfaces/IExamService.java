package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.enums.ExamStatus;

public interface IExamService {
    Exam createExam(Exam exam);

    Exam updateExam(Exam exam);

    void deleteExamById(String id);

    Exam getExamById(String id);

    Page<Exam> getExamByLessonId(String lessonId, Pageable pageable);
    Page<Exam> getExamByLessonIdAndStatus(String lessonId, ExamStatus examStatus, Pageable pageable);

    Long countByCourse(String courseId);
    Exam save(Exam exam);

    Double getMaxExamScore(String examId);
}
