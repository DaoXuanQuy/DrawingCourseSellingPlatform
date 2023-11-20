package vn.fpt.elearning.service.specifications;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.Question;

@Component
public class QuestionSpecification {
    public Specification<Question> equalExam(Exam exam) {
        return (root, query, criteriaBuilder) -> {
            if (exam != null) {
                return criteriaBuilder.equal(root.get(Question.Fields.exam), exam);
            }
            return null;
        };
    }

    public Specification<Question> equalId(String id) {
        return (root, query, criteriaBuilder) -> {
            if (id != null) {
                return criteriaBuilder.equal(root.get(Question.Fields.id), id);
            }
            return null;
        };
    }
}
