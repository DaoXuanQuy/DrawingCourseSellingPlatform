package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.entity.Question;
import vn.fpt.elearning.repository.QuestionRepository;
import vn.fpt.elearning.service.interfaces.IQuestionService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {
    public final QuestionRepository questionRepository;

    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestionByExam(Exam exam) {
        questionRepository.deleteAllByExam(exam);
    }

    @Override
    public Question getQuestionById(String id) {
        return questionRepository.findById(id).orElse(null);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestionById(String id) {
        questionRepository.deleteById(id);
    }

    @Override
    public Page<Question> getQuestion(Specification<Question> specification, Pageable pageable) {
        return questionRepository.findAll(specification, pageable);
    }

    @Override
    public List<Question> getAllQuestionByExam(Exam exam) {
        return questionRepository.findByExam(exam);
    }

    @Override
    public Page<Question> getPageQuestionByExam(Exam exam, Pageable pageable) {
        return questionRepository.findByExam(exam, pageable);
    }

    @Override
    public Question save(Question question) {
        return questionRepository.save(question);
    }
}
