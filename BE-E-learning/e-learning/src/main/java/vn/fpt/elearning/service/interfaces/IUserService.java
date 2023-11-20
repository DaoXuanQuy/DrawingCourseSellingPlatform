package vn.fpt.elearning.service.interfaces;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.fpt.elearning.entity.User;

import java.util.List;

public interface IUserService {
    User getUserById(String userId);
    User getUserByIdNotNull(String userId);

    User createUser(User user);

    User updateUser(User user);

    User getUserByEmail(String email);

    User getUserByPhone(String phone);

    void deleteUser(String id);

    Page<User> getUsers(Specification<User> specification, Pageable pageable);

    User getUserBySessionId(String sessionId);

//    Page<User> getRecommendFiend(String userId, Pageable pageable, boolean isTeacher);

    Page<User> getChatWithTeacher(String userId, Pageable pageable);
    List<User> getChatWithTeacher(String userId);

//    Page<User> getFriendChatRecent(String userId, Pageable pageable);
//
//    List<User> getFriendChatRecent(String userId);
}
