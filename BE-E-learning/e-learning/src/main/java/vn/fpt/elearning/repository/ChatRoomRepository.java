//package vn.hcmute.elearning.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import vn.hcmute.elearning.entity.chat.ChatRoom;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
//    Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId);
//
//    Page<ChatRoom> findAllBySenderIdAndRecipientIdNotIn(String userId, List<String> recipientIds, Pageable pageable);
//    List<ChatRoom> findAllBySenderId(String userId);
//
//    ChatRoom findBySenderIdAndChatId(String userId, String chatId);
//}
