package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, String>, JpaSpecificationExecutor<Teacher> {
    @Query("select tc from Teacher tc where tc.user.id = :userId")
    Teacher getByUserId(String userId);
}
