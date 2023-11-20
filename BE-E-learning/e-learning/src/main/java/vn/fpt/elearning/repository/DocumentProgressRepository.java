package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.entity.DocumentProgress;

public interface DocumentProgressRepository extends JpaRepository<DocumentProgress, String> {
    void deleteByDocumentIdAndUserId(final String documentId, final String userId);

    boolean existsByDocumentIdAndUserId(final String documentId, final String userId);
    
    @Query("SELECT COUNT(dp.id) " +
           "FROM DocumentProgress dp " +
           "JOIN dp.document d " +
           "JOIN d.lesson l " +
           "JOIN l.course c " +
           "WHERE c.id = :courseId " +
           "AND dp.user.id = :userId " +
           "AND d.displayStatus = 'VISIBLE' " +
           "AND l.displayStatus = 'VISIBLE'")
    long countByCourseIdAndUserId(final String courseId, final String userId);
}
