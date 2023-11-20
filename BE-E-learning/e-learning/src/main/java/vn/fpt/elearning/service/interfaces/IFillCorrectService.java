package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.entity.FillCorrect;

import java.util.List;
import java.util.Set;

public interface IFillCorrectService {
    List<FillCorrect> saveAll(List<FillCorrect> fillCorrects);
    Set<FillCorrect> getAllByIds(List<String> ids);
    Set<FillCorrect> getByQuestion(String questionId);
    void deleteAllByQuestionId(String questionId);
}
