package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Lesson;
import vn.fpt.elearning.enums.DisplayStatus;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.LessonRepository;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.ILessonService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService implements ILessonService {

    private final LessonRepository lessonRepository;

    @Override
    public List<Lesson> getLessonsByCourse(String courseId) {
        return lessonRepository.findAllByCourseIdOrderByCreateDate(courseId);
    }

    @Override
    public Page<Lesson> getAll(Specification<Lesson> specification, Pageable pageable) {
        return lessonRepository.findAll(specification, pageable);
    }

    @Override
    public Lesson getById(String id) {
        return lessonRepository.findById(id).orElseThrow(() -> new InternalException(ResponseCode.LESSON_NOT_FOUND));
    }

    @Override
    public Lesson getByIdAndCreateBy(String id, String userId) {
        return lessonRepository.findByIdAndCreatedBy(id, userId);
    }

    @Override
    public Lesson save(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    @Override
    public void deleteById(String lessonId) {
        lessonRepository.deleteById(lessonId);
    }

    @Override
    public List<Lesson> getLessonByCourseIdAndStatus(String courseId, DisplayStatus displayStatus) {
        return lessonRepository.findAllByCourseIdAndDisplayStatusOrderByCreateDate(courseId, displayStatus);
    }
}
