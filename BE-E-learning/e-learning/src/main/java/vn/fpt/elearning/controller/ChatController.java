//package vn.hcmute.elearning.controller;
//
//
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.security.SecurityRequirement;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import lombok.RequiredArgsConstructor;
//import org.springdoc.api.annotations.ParameterObject;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.web.bind.annotation.*;
//import core.vn.fpt.elearning.BaseController;
//import core.vn.fpt.elearning.PageResponseData;
//import core.vn.fpt.elearning.ResponseBase;
//import vn.hcmute.elearning.dtos.chat.request.*;
//import response.chat.dtos.vn.fpt.elearning.CountNewMessageResponse;
//import vn.hcmute.elearning.dtos.chat.response.CreateRoomChatResponse;
//import vn.hcmute.elearning.dtos.chat.response.GetChatMessagesEachOtherResponse;
//import vn.hcmute.elearning.dtos.chat.response.GetRoomChatResponse;
//import vn.hcmute.elearning.entity.chat.ChatMessage;
//import vn.hcmute.elearning.entity.chat.ChatRoom;
//import chat.model.vn.fpt.elearning.NotifyChatModel;
//import chat.model.vn.fpt.elearning.ReadChatModel;
//import chat.model.vn.fpt.elearning.UserInfoChat;
//import vn.hcmute.elearning.service.chat.ChatMessageService;
//import vn.hcmute.elearning.service.chat.ChatRoomService;
//
//import javax.validation.Valid;
//
//@RestController
//@RequiredArgsConstructor
//@Tag(name = "Chat controller")
//public class ChatController extends BaseController {
//
//    private final SimpMessagingTemplate messagingTemplate;
//    private final ChatMessageService chatMessageService;
//    private final ChatRoomService chatRoomService;
//
//    private static final String TOPIC_CHAT_MESSAGE = "/queue/messages";
//    private static final String TOPIC_NOTIFY_TOTAL_MESSAGES = "/notify/total-messages";
//
//    @MessageMapping("/chat")
//    public void processMessage(@Payload ChatMessage chatMessage) {
//        var chatId = chatRoomService
//                .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
//        chatMessage.setChatId(chatId.get());
//
//        ChatMessage saved = chatMessageService.save(chatMessage);
//        int totalMessageNoRead = chatMessageService.countMessage(chatMessage.getSenderId(), chatId.get(), false);
//        NotifyChatModel notifyChatModel = new NotifyChatModel(chatMessage.getSenderId(), totalMessageNoRead);
//
//        messagingTemplate.convertAndSendToUser(chatMessage.getRecipientId(), TOPIC_NOTIFY_TOTAL_MESSAGES, notifyChatModel);
//        messagingTemplate.convertAndSendToUser(chatMessage.getRecipientId(), TOPIC_CHAT_MESSAGE, saved);
//    }
//
//    @MessageMapping("/chat/read")
//    public void readMessage(@Payload ReadChatModel readChatModel) {
//        chatMessageService.readAllChatBySenderAndRecipient(readChatModel.getRecipientId(), readChatModel.getUserId());
//        ChatRoom chatRoom = chatRoomService.getRoomByUserAndRecipient(readChatModel.getUserId(), readChatModel.getRecipientId());
//
//        int totalMessageNoRead = chatMessageService.countMessage(chatRoom.getRecipientId(), chatRoom.getChatId(), false);
//        NotifyChatModel notifyChatModel = new NotifyChatModel(chatRoom.getRecipientId(), totalMessageNoRead);
//        messagingTemplate.convertAndSendToUser(readChatModel.getUserId(), TOPIC_NOTIFY_TOTAL_MESSAGES, notifyChatModel);
//    }
//
//    @GetMapping("/messages/{senderId}/{recipientId}/count")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<Long> countNewMessages(
//            @PathVariable String senderId,
//            @PathVariable String recipientId) {
//
//        return ResponseEntity
//                .ok(chatMessageService.countNewMessages(senderId, recipientId));
//    }
//
//    @GetMapping("/messages")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<PageResponseData<ChatMessage>>> findChatMessages(@ParameterObject GetChatMessagesEachOtherRequest request,
//                                                                                           @ParameterObject Pageable pageable) {
//        request.setPageable(pageable);
//        return this.execute(request);
//    }
//
//    @GetMapping("/messages/{id}")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<?> findMessage(@PathVariable String id) {
//        return ResponseEntity
//                .ok(chatMessageService.findById(id));
//    }
//
//    @PostMapping("/chat/create-rooom")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<CreateRoomChatResponse>> createRoomChat(@RequestBody @Valid CreateRoomChatRequest request) {
//        return this.execute(request, CreateRoomChatResponse.class);
//    }
//
//    @GetMapping("/portal/chat/recommend-friend")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<PageResponseData<UserInfoChat>>> getRecommendFriendForStudent(@ParameterObject Pageable pageable) {
//        GetRecommendFriendFoStudentRequest request = new GetRecommendFriendFoStudentRequest(pageable);
//        return this.execute(request);
//    }
//
//    @GetMapping("/teacher/chat/recommend-friend")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<PageResponseData<UserInfoChat>>> getRecommendFriendForTeacher(@ParameterObject Pageable pageable) {
//        GetRecommendFriendFoTeacherRequest request = new GetRecommendFriendFoTeacherRequest(pageable);
//        return this.execute(request);
//    }
//
//    @GetMapping("/chat/teacher")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<PageResponseData<UserInfoChat>>> getChatWithTeacher(@ParameterObject Pageable pageable) {
//        GetChatWithTeacherRequest request = new GetChatWithTeacherRequest(pageable);
//        return this.execute(request);
//    }
//
//    @GetMapping("/chat/friend-recent")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<PageResponseData<UserInfoChat>>> getChatFriendRecent(@ParameterObject Pageable pageable) {
//        GetChatFriendRecentRequest request = new GetChatFriendRecentRequest(pageable);
//        return this.execute(request);
//    }
//
//    @GetMapping("/chat/getRoom")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<GetRoomChatResponse>> getRoomChat(@ParameterObject GetRoomChatRequest request) {
//        return this.execute(request);
//    }
//
//    @GetMapping("/chat/count-new-message")
//    @Operation(
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<ResponseBase<CountNewMessageResponse>> countNewMessage(@ParameterObject CountNewMessageRequest request) {
//        return this.execute(request);
//    }
//}