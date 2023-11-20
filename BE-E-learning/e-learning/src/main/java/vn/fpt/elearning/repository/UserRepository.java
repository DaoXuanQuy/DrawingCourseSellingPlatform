package vn.fpt.elearning.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {
    User findByActiveAndEmail(boolean active, String email);

    User findByActiveAndPhone(boolean active, String phone);

    User findByEmail(String email);

    User findByPhone(String phone);
    Optional<User> findById(String id);

    @Query(value = "select distinct u from Course c " +
            "left join Teacher t on c.teacher.id = t.id " +
            "left join c.users cu " +
            "left join User u on u.id = cu.id " +
            "where u.id <>:userId " +
            "and (coalesce(:userIdRecent) is null or u.id not in (:userIdRecent))")
    Page<User> getRecommendFiendForStudent(String userId, List<String> userIdRecent, Pageable pageable);

    @Query(value = "select distinct u from Course c " +
            "left join Teacher t on c.teacher.id = t.id " +
            "left join c.users cu " +
            "left join User u on u.id = cu.id " +
            "where (t.user.id =:userId and t.id = c.teacher.id) " +
            "and (coalesce(:userIdRecent) is null or u.id not in (:userIdRecent)) and u is not null")
    Page<User> getRecommendFiendForTeacher(String userId, List<String> userIdRecent, Pageable pageable);

    @Query(value = "select u.* from ( " +
            "select distinct cus1.user_id from ( " +
            "select * from course c left join course_user cu on c.id = cu.course_id " +
            "where cu.user_id = :userId) cus left join course_user cus1 on cus.course_id = cus1.course_id " +
            "where cus1.user_id != :userId) as cus2 left join user u on cus2.user_id = u.id order by u.created_date",nativeQuery = true)
    List<User> getRecommendFiend(String userId);

    @Query(value = "select distinct u from Course c left join c.users cu " +
            "left join Teacher tc on c.teacher.id = tc.id " +
            "left join User u on tc.user.id = u.id where cu.id =:userId")
    Page<User> getTeacherChat(String userId, Pageable pageable);

    @Query(value = "select u.* from ( " +
            "select tc.user_id from ( " +
            "select distinct c.teacher_id from ( " +
            "select * from course c left join course_user cu on c.id = cu.course_id " +
            "where cu.user_id = :userId) as t1 left join course c on t1.course_id = c.id) as t2 left join teacher tc on t2.teacher_id = tc.id) as us " +
            "left join user u on us.user_id = u.id order by u.created_date", nativeQuery = true)
    List<User> getTeacherChat(String userId);

    User findBySessionId(String sessionId);


}
