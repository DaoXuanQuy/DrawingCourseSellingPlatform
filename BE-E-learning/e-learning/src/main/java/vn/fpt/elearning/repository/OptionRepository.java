package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.fpt.elearning.entity.Option;

import java.util.List;
import java.util.Set;

public interface OptionRepository extends JpaRepository<Option, String>, JpaSpecificationExecutor<Option> {
    List<Option> findAllByQuestionId(String questionId);
    Set<Option> findAllByQuestionIdAndCorrect(String questionId, boolean isCorrect);
    Set<Option> findAllByIdIn(List<String> ids);
    void deleteAllByQuestionId(String questionId);
}
