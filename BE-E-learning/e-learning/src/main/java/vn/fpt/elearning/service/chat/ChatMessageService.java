//package vn.hcmute.elearning.service.chat;
//
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.mongodb.core.MongoOperations;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.data.mongodb.core.query.Update;
//import org.springframework.stereotype.Service;
//import vn.hcmute.elearning.entity.chat.ChatMessage;
//import vn.hcmute.elearning.entity.chat.ChatRoom;
//import enums.vn.fpt.elearning.MessageStatus;
//import enums.vn.fpt.elearning.ResponseCode;
//import exception.vn.fpt.elearning.InternalException;
//import vn.hcmute.elearning.repository.ChatMessageRepository;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class ChatMessageService {
//    private final ChatMessageRepository repository;
//    private final ChatRoomService chatRoomService;
//    private final MongoOperations mongoOperations;
//
//    public ChatMessage save(ChatMessage chatMessage) {
//        chatMessage.setStatus(MessageStatus.RECEIVED);
//        repository.save(chatMessage);
//        return chatMessage;
//    }
//
//    public long countNewMessages(String senderId, String recipientId) {
//        return repository.countBySenderIdAndRecipientIdAndStatus(
//                senderId, recipientId, MessageStatus.RECEIVED);
//    }
//
//    public Page<ChatMessage> getChatMessagesEachOther(String senderId, String recipientId, Pageable pageable) {
//        var chatId = chatRoomService.getChatId(senderId, recipientId, false)
//                .orElseThrow(() -> new InternalException(ResponseCode.ROOM_CHAT_NOT_FOUND));
//        var messages = repository.findByChatId(chatId, pageable);
//        return messages;
//    }
//
//    public ChatMessage findById(String id) {
//        return repository
//                .findById(id)
//                .map(chatMessage -> {
//                    chatMessage.setStatus(MessageStatus.DELIVERED);
//                    return repository.save(chatMessage);
//                })
//                .orElseThrow(() ->
//                        new InternalException(ResponseCode.FAILED));
//    }
//
//    public void updateStatuses(String senderId, String recipientId, MessageStatus status) {
//        Query query = new Query(
//                Criteria
//                        .where("senderId").is(senderId)
//                        .and("recipientId").is(recipientId));
//        Update update = Update.update("status", status);
//        mongoOperations.updateMulti(query, update, ChatMessage.class);
//    }
//
//    public void readAllChatBySenderAndRecipient(String senderId, String recipientId) {
//        List<ChatMessage> chatMessages = repository.findAllBySenderIdAndRecipientId(senderId, recipientId, false);
//        chatMessages.forEach(data -> data.setIsRead(true));
//        repository.saveAll(chatMessages);
//    }
//
//    public void readChats(List<String> messageIds) {
//        List<ChatMessage> chatMessages = messageIds.parallelStream()
//                .map(messageId -> {
//                    Optional<ChatMessage> optional = repository.findById(messageId);
//                    if (optional.isPresent()) {
//                        ChatMessage message = optional.get();
//                        message.setIsRead(true);
//                        return message;
//                    }
//                    return null;
//                 }).collect(Collectors.toList());
//
//        repository.saveAll(chatMessages);
//    }
//
//    public int countMessage(String userId, String chatId, Boolean isRead) {
//        ChatRoom chatRoom = chatRoomService.getRoomByUserAndChatId(userId, chatId);
//        if (chatRoom == null) {
//            return 0;
//        }
//        return repository.countAllBySenderIdAndChatIdAndIsRead(chatRoom.getSenderId(), chatRoom.getChatId(), isRead);
//    }
//}
