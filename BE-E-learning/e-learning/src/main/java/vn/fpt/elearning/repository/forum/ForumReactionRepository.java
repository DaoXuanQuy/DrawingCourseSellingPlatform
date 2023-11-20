package vn.fpt.elearning.repository.forum;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.fpt.elearning.dtos.forum.reaction.request.GetReactionFilterPagingRequest;
import vn.fpt.elearning.dtos.forum.reaction.response.ReactionInfo;
import vn.fpt.elearning.entity.forum.ForumReaction;
import vn.fpt.elearning.enums.forum.ForumReactionType;

public interface ForumReactionRepository extends JpaRepository<ForumReaction, ForumReaction.ReactionId>, JpaSpecificationExecutor<ForumReaction> {

    @Query(value = "SELECT COUNT(r) > 0 " +
            "FROM ForumReaction r " +
            "WHERE r.postId = :postId" +
            "   AND r.userId = :userId" +
            "   AND r.reactionType = :reactionType")
    boolean existsByPostIdAndUserIdAndReactionType(@Param("postId") String postId, @Param("userId") String userId, @Param("reactionType") ForumReactionType reactionType);

    @Query(value = "SELECT new response.reaction.forum.dtos.vn.fpt.elearning.ReactionInfo(" +
            "r.postId, r.userId, u.firstName, u.lastName, r.reactionType" +
            ") " +
            "FROM ForumReaction r " +
            "   LEFT JOIN User u ON u.id = r.userId " +
            "WHERE 1 = 1" +
            "   AND r.postId = :#{#request.postId}" +
            "   AND (:#{#request.reactionType} IS NULL OR r.reactionType = :#{#request.reactionType}) "
    )
    Page<ReactionInfo> findReactionFilterPaging(
            @Param("request") GetReactionFilterPagingRequest request,
            Pageable pageable
    );
}