package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.entity.Option;

import java.util.List;
import java.util.Set;

public interface IOptionService {
    Option save(Option option);
    List<Option> getOptionsByQuestion(String questionId);
    Option getOptionByIdNotNull(String id);
    Set<Option> getCorrectOptionsByQuestion(String questionId);
    Set<Option> getByIds(List<String> ids);
    List<Option> saveAll(List<Option> options);
    void deleteAllByQuestionId(String questionId);

}
