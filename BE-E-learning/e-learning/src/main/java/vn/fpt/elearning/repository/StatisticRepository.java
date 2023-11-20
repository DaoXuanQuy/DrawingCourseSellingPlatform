package vn.fpt.elearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.elearning.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface StatisticRepository extends JpaRepository<User, String> {

    /**
     * totalUsers;
     * totalTeacher;
     * totalCourses;
     * totalSuccessInvoices;
     */
    @Query(
            value =
                "SELECT COUNT( DISTINCT u.id) FROM user_data u WHERE u.active = TRUE AND u.ban = FALSE AND (:fromDate is null or u.created_date >= DATE(:fromDate)) AND (:toDate is null or u.created_date <= DATE(:toDate)) " +
                "UNION ALL " +
                "SELECT COUNT(DISTINCT t.id) FROM teacher t WHERE t.status = 'ACTIVE' AND (:fromDate is null or t.created_date >= DATE(:fromDate)) AND (:toDate is null or t.created_date <= DATE(:toDate)) " +
                "UNION ALL " +
                "SELECT COUNT(DISTINCT c.id) FROM course c WHERE c.approve_status = 'APPROVE' AND c.status = 'ACTIVE' AND (:fromDate is null or c.created_date >= DATE(:fromDate)) AND (:toDate is null or c.created_date <= DATE(:toDate)) " +
                "UNION ALL " +
                "SELECT COUNT(DISTINCT i.id) FROM invoice i WHERE i.status = 'SUCCESS' AND (:fromDate is null or i.time >= DATE(:fromDate)) AND (:toDate is null or i.time <= DATE(:toDate)) ",
        nativeQuery = true
    )
    List<Long> cmsFindCardsInfo(LocalDate fromDate, LocalDate toDate);

    /**
     * totalCourses;
     * totalStudents;
     * totalSuccessInvoices;
     * balance;
     */

    @Query(
        value =
            "SELECT COUNT( DISTINCT c.id) FROM course c  where c.teacher_id = :teacherId and (:fromDate is null or c.created_date >= DATE(:fromDate)) and (:toDate is null or c.created_date <= DATE(:toDate))" +
            "UNION ALL " +
            "SELECT COUNT(DISTINCT cu.user_id) FROM teacher t INNER JOIN course c ON t.id = c.teacher_id INNER JOIN course_user cu ON c.id = cu.course_id WHERE t.id = :teacherId and (:fromDate is null or cu.create_at >= DATE(:fromDate)) and (:toDate is null or cu.create_at <= DATE(:toDate)) " +
            "UNION ALL " +
            "SELECT COUNT(DISTINCT i.id) FROM teacher t INNER JOIN course c ON t.id = c.teacher_id INNER JOIN invoice i on c.id = i.course_id WHERE t.id = :teacherId AND i.status = 'SUCCESS' and (:fromDate is null or i.time >= DATE(:fromDate)) and (:toDate is null or i.time <= DATE(:toDate))  " +
            "UNION ALL " +
            "SELECT COALESCE(SUM(i.amount), 0) FROM teacher t INNER JOIN course c ON t.id = c.teacher_id INNER JOIN invoice i on c.id = i.course_id WHERE t.id = :teacherId AND i.status = 'SUCCESS' and (:fromDate is null or i.time >= DATE(:fromDate)) and (:toDate is null or i.time <= DATE(:toDate))  ",
        nativeQuery = true
    )
    List<Long> teacherFindCardsInfo(String teacherId, LocalDate fromDate, LocalDate toDate);

    /**
     * fromDate;
     * toDate;
     */
    @Query(
        "SELECT COUNT(u.id) FROM User u WHERE u.createDate < :date "
    )
    Long countUserDateBefore(LocalDateTime date);
    @Query(
        "SELECT COUNT(c.id) FROM Course c WHERE c.createDate < :date "
    )
    Long countCourseDateBefore(LocalDateTime date);
    @Query(
        value = "SELECT " +
            "all_dates.date AS date, " +
            "COUNT(DISTINCT user_data.id) AS countUsers, " +
            "COUNT(DISTINCT course.id) AS countCourses " +
        "FROM " +
            "(SELECT date(user_data.created_date) AS date FROM user_data " +
            "UNION SELECT date(course.created_date) AS date FROM course) all_dates " +
                "LEFT JOIN user_data ON DATE(user_data.created_date) = all_dates.date " +
                "LEFT JOIN course ON DATE(course.created_date) = all_dates.date " +
        "WHERE all_dates.date BETWEEN :fromDate AND :toDate " +
        "GROUP BY " +
            "all_dates.date " , nativeQuery = true
    )
    List<Map<String, Object>> cmsGetStatistic(LocalDate fromDate, LocalDate toDate);


    /**
     * fromDate;
     * toDate;
     */
    @Query(
        value = "SELECT i.time as date, SUM(i.amount) as revenue " +
            "FROM teacher t " +
            "INNER JOIN course c on t.id = c.teacher_id " +
            "INNER JOIN invoice i on c.id = i.course_id " +
            "WHERE t.id = :teacherId AND i.status = 'SUCCESS' AND (i.time >= :fromDate and i.time <= :toDate) " +
            "GROUP BY i.time", nativeQuery = true
    )
    List<Map<String, Object>> teacherGetStatistic(String teacherId, LocalDate fromDate, LocalDate toDate);



}
