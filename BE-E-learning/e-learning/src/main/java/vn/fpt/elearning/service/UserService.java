package vn.fpt.elearning.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.entity.User;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.repository.UserRepository;
//import vn.hcmute.elearning.entity.chat.ChatRoom;
//import vn.hcmute.elearning.repository.ChatRoomRepository;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.service.interfaces.IUserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
//    private final ChatRoomRepository chatRoomRepository;

    @Override
    public User getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User getUserByIdNotNull(String userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new InternalException(ResponseCode.USER_NOT_FOUND));
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public Page<User> getUsers(Specification<User> specification, Pageable pageable) {
        return userRepository.findAll(specification, pageable);
    }

    @Override
    public User getUserBySessionId(String sessionId) {
        return userRepository.findBySessionId(sessionId);
    }

//    @Override
//    public Page<User> getRecommendFiend(String userId, Pageable pageable, boolean isTeacher) {
//        List<ChatRoom> chatRoomList = chatRoomRepository.findAllBySenderId(userId);
//        if (isTeacher) {
//            return userRepository.getRecommendFiendForTeacher(userId, chatRoomList.parallelStream().map(ChatRoom::getRecipientId).collect(Collectors.toList()), pageable);
//        }
//        return userRepository.getRecommendFiendForStudent(userId, chatRoomList.parallelStream().map(ChatRoom::getRecipientId).collect(Collectors.toList()), pageable);
//    }

    @Override
    public Page<User> getChatWithTeacher(String userId, Pageable pageable) {
        return userRepository.getTeacherChat(userId, pageable);
    }

    @Override
    public List<User> getChatWithTeacher(String userId) {
        return userRepository.getTeacherChat(userId);
    }

//    @Override
//    public Page<User> getFriendChatRecent(String userId, Pageable pageable) {
//        List<User> users = new ArrayList<>();
//        List<User> teacherChat = this.getChatWithTeacher(userId);
//        Page<ChatRoom> chatRoomPage = chatRoomRepository.findAllBySenderIdAndRecipientIdNotIn(userId, teacherChat.parallelStream().map(User::getId).collect(Collectors.toList()), pageable);
//        chatRoomPage.getContent().forEach(chatRoom -> users.add(this.getUserById(chatRoom.getRecipientId())));
//        return new PageImpl<>(users, pageable, chatRoomPage.getTotalElements());
//    }
//
//    @Override
//    public List<User> getFriendChatRecent(String userId) {
//        List<User> users = new ArrayList<>();
//        List<ChatRoom> chatRoomPage = chatRoomRepository.findAllBySenderId(userId);
//        chatRoomPage.parallelStream().forEach(chatRoom -> users.add(this.getUserById(chatRoom.getRecipientId())));
//        return users;
//    }
}
