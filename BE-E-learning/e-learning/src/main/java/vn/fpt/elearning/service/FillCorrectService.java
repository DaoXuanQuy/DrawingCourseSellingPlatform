package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.FillCorrect;
import vn.fpt.elearning.repository.FillCorrectRepository;
import vn.fpt.elearning.service.interfaces.IFillCorrectService;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FillCorrectService implements IFillCorrectService {
    private final FillCorrectRepository fillCorrectRepository;
    @Override
    public List<FillCorrect> saveAll(List<FillCorrect> fillCorrects) {
        return fillCorrectRepository.saveAll(fillCorrects);
    }

    @Override
    public Set<FillCorrect> getAllByIds(List<String> ids) {
        return fillCorrectRepository.findAllByIdIn(ids);
    }

    @Override
    public Set<FillCorrect> getByQuestion(String questionId) {
        return fillCorrectRepository.findAllByQuestionId(questionId);
    }

    @Override
    public void deleteAllByQuestionId(String questionId) {
        fillCorrectRepository.deleteAllByQuestionId(questionId);
    }
}
