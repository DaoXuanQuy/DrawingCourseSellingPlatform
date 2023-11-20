package vn.fpt.elearning.dtos.forum.topic.request;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.entity.forum.ForumTopic;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetTopicPagingFilterRequest extends BaseRequestData implements Specification<ForumTopic> {

    private String categoryId;
    private String tags;
    private String title;

    @Override
    public Predicate toPredicate(Root<ForumTopic> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        if (StringUtils.isNotBlank(categoryId)) {
            predicates.add(cb.equal(root.get("category").get("id"), categoryId));
        }

        if (StringUtils.isNotBlank(title)) {
            predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
        }
        return cb.and(predicates.toArray(Predicate[]::new));
    }
}
