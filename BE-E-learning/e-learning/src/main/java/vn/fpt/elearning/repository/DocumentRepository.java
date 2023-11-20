package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.entity.Document;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, String>, JpaSpecificationExecutor<Document> {
    Document findByIdAndCreatedBy(String id, String userId);

    @Query(value = "SELECT * from document where document.lesson_id = :lessonId order by document.created_date", nativeQuery = true)
    List<Document> findAllByLessonId(String lessonId);

    @Query(value = "SELECT * from document, (select l.id from lesson l, (select course_id from course_user where course_user.user_id = :userId) as p where p.course_id = l.course_id) as les " +
            "where les.id = document.lesson_id and les.id = :lessonId and document.display_status = 'VISIBLE'", nativeQuery = true)
    List<Document> findDocumentForStudent(String lessonId, String userId);

    @Query("select count(d.id) " +
        "from Document d " +
        "inner join d.lesson l " +
        "inner join l.course c " +
        "where c.id = :courseId and d.displayStatus = 'VISIBLE'"
    )
    long countByCourseId(String courseId);
}
