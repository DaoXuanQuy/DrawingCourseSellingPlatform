package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.entity.Answer;

import java.util.List;

public interface IAnswerService {
    Answer save(Answer answer);
    List<Answer> saveAll(List<Answer> answers);
    List<Answer> getByCode(String code);
}
