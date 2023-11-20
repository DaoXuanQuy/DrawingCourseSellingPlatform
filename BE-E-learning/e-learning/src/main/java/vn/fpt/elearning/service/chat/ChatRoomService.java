//package vn.hcmute.elearning.service.chat;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import vn.hcmute.elearning.entity.chat.ChatRoom;
//import vn.hcmute.elearning.repository.ChatRoomRepository;
//
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class ChatRoomService {
//
//    private final ChatRoomRepository chatRoomRepository;
//
//    public ChatRoom save(ChatRoom chatRoom) {
//        return chatRoomRepository.save(chatRoom);
//    }
//
//    public ChatRoom getRoomByUserAndRecipient(String userId, String recipient) {
//        return chatRoomRepository.findBySenderIdAndRecipientId(userId, recipient).orElse(null);
//    }
//
//    public ChatRoom getRoomByUserAndChatId(String userId, String id){
//        return chatRoomRepository.findBySenderIdAndChatId(userId, id);
//    }
//
//    public Optional<String> getChatId(
//            String senderId, String recipientId, boolean createIfNotExist) {
//
//        return chatRoomRepository
//                .findBySenderIdAndRecipientId(senderId, recipientId)
//                .map(ChatRoom::getChatId)
//                .or(() -> {
//                    if (!createIfNotExist) {
//                        return Optional.empty();
//                    }
//                    var chatId =
//                            String.format("%s_%s", senderId, recipientId);
//
//                    ChatRoom senderRecipient = ChatRoom
//                            .builder()
//                            .chatId(chatId)
//                            .senderId(senderId)
//                            .recipientId(recipientId)
//                            .build();
//
//                    ChatRoom recipientSender = ChatRoom
//                            .builder()
//                            .chatId(chatId)
//                            .senderId(recipientId)
//                            .recipientId(senderId)
//                            .build();
//                    chatRoomRepository.save(senderRecipient);
//                    chatRoomRepository.save(recipientSender);
//
//                    return Optional.of(chatId);
//                });
//    }
//}