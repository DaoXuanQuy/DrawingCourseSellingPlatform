package vn.fpt.elearning.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.entity.Teacher;

public interface ITeacherService {
    Teacher save(Teacher teacher);

    Teacher getById(String id);

    Teacher getByUserId(String userId);

    Page<Teacher> getListTeacher(Specification<Teacher> specification, Pageable pageable);
}
