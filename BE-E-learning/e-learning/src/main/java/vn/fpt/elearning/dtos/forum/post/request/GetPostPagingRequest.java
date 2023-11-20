package vn.fpt.elearning.dtos.forum.post.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.entity.forum.ForumPost;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetPostPagingRequest extends BaseRequestData implements Specification<ForumPost> {

    @NotNull
    private Long topicId;

    @Override
    public Predicate toPredicate(Root<ForumPost> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.equal(root.get("topic").get("id"), getTopicId()));

        return cb.and(predicates.toArray(Predicate[]::new));
    }
}
