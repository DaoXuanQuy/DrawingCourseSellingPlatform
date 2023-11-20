package vn.fpt.elearning.repository.forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.fpt.elearning.entity.forum.ForumTopic;

public interface ForumTopicRepository extends JpaRepository<ForumTopic, Long>, JpaSpecificationExecutor<ForumTopic> {

    @Query(value = "SELECT t.* " +
            "FROM forum_topic t " +
            "WHERE t.category_id = :categoryId " +
            "ORDER BY t.created_date DESC " +
            "LIMIT 1", nativeQuery = true)
    ForumTopic getLatestPostByCategoryId(@Param("categoryId") String categoryId);
}