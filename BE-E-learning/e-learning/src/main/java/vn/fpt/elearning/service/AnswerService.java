package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Answer;
import vn.fpt.elearning.repository.AnswerRepository;
import vn.fpt.elearning.service.interfaces.IAnswerService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService implements IAnswerService {

    private final AnswerRepository answerRepository;

    @Override
    public Answer save(Answer answer) {
        return answerRepository.save(answer);
    }

    @Override
    public List<Answer> saveAll(List<Answer> answers) {
        return answerRepository.saveAll(answers);
    }

    @Override
    public List<Answer> getByCode(String code) {
        return answerRepository.findAllByCode(code);
    }
}
