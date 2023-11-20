package vn.fpt.elearning.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.enums.ExamStatus;

public interface ExamRepository extends JpaRepository<Exam, String> {
    @Query(value = "select e from Exam e join e.lesson c where c.id = ?1")
    Page<Exam> findExamByCourseId(String lessonId, Pageable pageable);

    @Query(value = "select e from Exam e join e.lesson c where c.id = :lessonId and e.status = :examStatus")
    Page<Exam> findExamByCourseIdAndStatus(String lessonId, ExamStatus examStatus, Pageable pageable);

    @Query(value = "select count(e.id) from Exam e inner join e.lesson.course c where c.id = :courseId and e.status = 'ACTIVE'")
    Long countByCourseId(String courseId);

    @Query(value = "select sum(q.point) from Question q join q.exam e where e.id = :examId")
    Double getMaxExamScore(String examId);
}
