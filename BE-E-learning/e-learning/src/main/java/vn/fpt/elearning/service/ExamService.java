package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Exam;
import vn.fpt.elearning.enums.ExamStatus;
import vn.fpt.elearning.repository.ExamRepository;
import vn.fpt.elearning.service.interfaces.IExamService;

@Service
@RequiredArgsConstructor
public class ExamService implements IExamService {

    private final ExamRepository examRepository;

    @Override
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public Exam updateExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public void deleteExamById(String id) {
        examRepository.deleteById(id);
    }

    @Override
    public Exam getExamById(String id) {
        return examRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Exam> getExamByLessonId(String lessonId, Pageable pageable) {
        return examRepository.findExamByCourseId(lessonId, pageable);
    }

    @Override
    public Page<Exam> getExamByLessonIdAndStatus(String lessonId, ExamStatus examStatus, Pageable pageable) {
        return examRepository.findExamByCourseIdAndStatus(lessonId, examStatus, pageable);
    }

    @Override
    public Long countByCourse(String courseId) {
        return examRepository.countByCourseId(courseId);
    }

    @Override
    public Exam save(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public Double getMaxExamScore(String examId) {
        return examRepository.getMaxExamScore(examId);
    }
}
