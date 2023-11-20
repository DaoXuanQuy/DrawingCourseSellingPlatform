//package vn.hcmute.elearning.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import vn.hcmute.elearning.entity.chat.ChatMessage;
//import enums.vn.fpt.elearning.MessageStatus;
//
//import java.util.List;
//
//public interface ChatMessageRepository
//        extends MongoRepository<ChatMessage, String> {
//
//    long countBySenderIdAndRecipientIdAndStatus(
//            String senderId, String recipientId, MessageStatus status);
//
//    Page<ChatMessage> findByChatId(String chatId, Pageable pageable);
//
//    int countAllBySenderIdAndChatIdAndIsRead(String senderId, String chatId, Boolean isRead);
//
//    List<ChatMessage> findAllBySenderIdAndRecipientId(String senderId, String recipientId, boolean isRead);
//}