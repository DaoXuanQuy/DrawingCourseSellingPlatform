package vn.fpt.elearning.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.dtos.exam_result.response.UngradedExamResponse;
import vn.fpt.elearning.entity.ExamResult;
import vn.fpt.elearning.enums.ExamResultStatus;

import java.util.Optional;

public interface ExamResultRepository extends JpaRepository<ExamResult, String>, JpaSpecificationExecutor<ExamResult> {
    @Query("select examResult from ExamResult examResult where examResult.exam.id=?1")
    ExamResult findByExamId(String examId);

    @Query(value = "select * from exam_result er inner join exam e on er.exam_id = e.id inner join user u on er.user_id = u.id where e.id = :examId and u.id = :userId order by er.score DESC LIMIT 1", nativeQuery = true)
    ExamResult studentFindFirstByUserIdAndExamId(String userId, String examId);

    int countByUserIdAndExamId(String userId, String examId);
    int countByExamId(String examId);

    @Query("select new response.exam_result.dtos.vn.fpt.elearning.UngradedExamResponse(er.id, u.id, concat(u.firstName, ' ', u.lastName), er.createDate, er.time, er.correctTotal, er.score, er.status, er.comment) " +
        "from ExamResult er " +
        "inner join er.exam e " +
        "inner join er.user u " +
        "inner join e.lesson l " +
        "inner join l.course c " +
        "inner join c.teacher t " +
        "where e.id = :examId and t.id = :teacherId and :status is null or er.status = :status"
    )
    Page<UngradedExamResponse> findUngradedExams(String examId, String teacherId, ExamResultStatus status, Pageable pageable);

    Optional<ExamResult> findByCode(String code);

    Optional<ExamResult> findByUserIdAndExamIdAndScore(String userId, String examId, Double score);
    Optional<ExamResult> findByUserIdAndExamIdAndStatus(String userId, String examId, ExamResultStatus status);

    Optional<ExamResult> findByCodeAndUserId(String code, String userId);
}
