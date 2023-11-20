//package vn.hcmute.elearning.entity.chat;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//import enums.vn.fpt.elearning.MessageStatus;
//
//import java.time.LocalDateTime;
//import java.util.Date;
//import java.util.List;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//@Document(collection = "chat_message")
//public class ChatMessage {
//    @Id
//    private String id;
//    private String chatId;
//    private String senderId;
//    private String recipientId;
//    private String senderName;
//    private String recipientName;
//    private List<String> imagesUrl;
//    private String content;
//    private String timestamp;
//    private MessageStatus status;
//    private Boolean isRead = false;
//    private long epochTime = System.currentTimeMillis();
//}