package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Option;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.OptionRepository;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IOptionService;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OptionService implements IOptionService {

    private final OptionRepository optionRepository;

    @Override
    public Option save(Option option) {
        return optionRepository.save(option);
    }

    @Override
    public List<Option> getOptionsByQuestion(String questionId) {
        return optionRepository.findAllByQuestionId(questionId);
    }

    @Override
    public Option getOptionByIdNotNull(String id) {
        return optionRepository.findById(id)
            .orElseThrow(() -> new InternalException(ResponseCode.USER_NOT_FOUND));
    }

    @Override
    public Set<Option> getCorrectOptionsByQuestion(String questionId) {
        return optionRepository.findAllByQuestionIdAndCorrect(questionId, true);
    }

    @Override
    public Set<Option> getByIds(List<String> ids) {
        return optionRepository.findAllByIdIn(ids);
    }

    @Override
    public List<Option> saveAll(List<Option> options) {
        return optionRepository.saveAll(options);
    }

    @Override
    public void deleteAllByQuestionId(String questionId) {
        optionRepository.deleteAllByQuestionId(questionId);
    }
}
