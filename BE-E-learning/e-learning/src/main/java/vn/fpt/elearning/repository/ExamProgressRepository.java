package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.entity.ExamProgress;

public interface ExamProgressRepository extends JpaRepository<ExamProgress, String> {
    void deleteByExamIdAndUserId(String examId, String userId);
    boolean existsByExamIdAndUserId(String examId, String userId);


    @Query("select count(ep.id) " +
        "from ExamProgress ep " +
        "inner join ep.exam e " +
        "inner join e.lesson l " +
        "inner join l.course c " +
        "where c.id = :courseId and ep.user.id = :userId and l.displayStatus = 'VISIBLE' and e.status = 'ACTIVE'")
    long countByCourseIdAndUserId(String courseId, String userId);
}
