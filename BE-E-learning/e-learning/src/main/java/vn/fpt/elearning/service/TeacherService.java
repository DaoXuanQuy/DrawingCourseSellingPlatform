package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.Teacher;
import vn.fpt.elearning.repository.TeacherRepository;
import vn.fpt.elearning.service.interfaces.ITeacherService;

@Service
@RequiredArgsConstructor
public class TeacherService implements ITeacherService {
    private final TeacherRepository teacherRepository;

    @Override
    public Teacher save(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher getById(String id) {
        return teacherRepository.getById(id);
    }

    @Override
    public Teacher getByUserId(String userId) {
        return teacherRepository.getByUserId(userId);
    }

    @Override
    public Page<Teacher> getListTeacher(Specification<Teacher> specification, Pageable pageable) {
        return teacherRepository.findAll(specification, pageable);
    }
}
