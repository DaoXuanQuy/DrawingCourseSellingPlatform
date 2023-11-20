package vn.fpt.elearning.repository.forum;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.fpt.elearning.dtos.forum.post.response.PostInfoResult;
import vn.fpt.elearning.entity.forum.ForumPost;

public interface ForumPostRepository extends JpaRepository<ForumPost, String>, JpaSpecificationExecutor<ForumPost> {

    @Query(value = "SELECT COUNT(p.id) " +
            "FROM ForumPost p " +
            "WHERE p.topic.id = :topicId")
    int countByTopicId(@Param("topicId") Long topicId);

    @Query(value = "SELECT *, " +
            "CASE" +
            "   WHEN t1.reaction_type = 'LIKE' THEN 1 " +
            "   ELSE " +
            "       CASE WHEN t1.reaction_type = 'DISLIKE' THEN 2 " +
            "   ELSE 0 END " +
            "END as currentUserReactionType FROM ( " +
            "SELECT  p.id as id, p.created_date as createDate, p.created_by as createdBy, p.last_modified_by as lastModifiedBy, p.last_modified_date as lastModifiedDate, " +
            "   p.content as content, p.ordinal as ordinal, t.id as topicId, u.avatar as avatar, u.first_name as firstName, u.last_name as lastName, " +
            "   SUM(CASE WHEN r.reaction_type = 'LIKE' THEN 1 ELSE 0 END) as `like`,SUM(CASE WHEN r.reaction_type = 'DISLIKE' THEN 1 ELSE 0 END) as dislike " +
            "FROM forum_post p" +
            "   LEFT JOIN user u ON u.id = p.created_by " +
            "   LEFT JOIN forum_reaction r ON r.post_id = p.id " +
            "   LEFT JOIN forum_topic t ON t.id = p.topic_id " +
            "WHERE t.id = :topicId GROUP BY p.id) as t " +
            "LEFT JOIN (" +
            "   SELECT fr.post_id, fr.reaction_type " +
            "   FROM forum_reaction fr " +
            "   WHERE fr.user_id = :userId " +
            ") as t1 on t.id = t1.post_id GROUP BY t.id", nativeQuery = true
    )
    Page<PostInfoResult> findPostFilterPaging(
            @Param("topicId") Long topicId,
            @Param("userId") String userId,
            Pageable pageable
    );
}