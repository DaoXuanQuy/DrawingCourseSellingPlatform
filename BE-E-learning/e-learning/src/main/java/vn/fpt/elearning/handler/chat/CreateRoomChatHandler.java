//package vn.hcmute.elearning.handler.chat;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import core.vn.fpt.elearning.RequestHandler;
//import request.chat.dtos.vn.fpt.elearning.CreateRoomChatRequest;
//import vn.hcmute.elearning.dtos.chat.response.CreateRoomChatResponse;
//import entity.vn.fpt.elearning.User;
//import vn.hcmute.elearning.entity.chat.ChatRoom;
//import enums.vn.fpt.elearning.ResponseCode;
//import exception.vn.fpt.elearning.InternalException;
//import mapper.vn.fpt.elearning.IUserMapper;
//import vn.hcmute.elearning.model.chat.ChatRoomDto;
//import vn.hcmute.elearning.service.chat.ChatRoomService;
//import interfaces.service.vn.fpt.elearning.IUserService;
//
//import java.util.UUID;
//
//@Component
//@RequiredArgsConstructor
//public class CreateRoomChatHandler extends RequestHandler<CreateRoomChatRequest, CreateRoomChatResponse> {
//    private final ChatRoomService chatRoomService;
//    private final IUserService iUserService;
//    private final IUserMapper iUserMapper;
//
//    @Override
//    public CreateRoomChatResponse handle(CreateRoomChatRequest request) {
//        User userRecipient = iUserService.getUserById(request.getRecipientId());
//        if (userRecipient == null) {
//            throw new InternalException(ResponseCode.USER_NOT_FOUND);
//        }
//        if (request.getRecipientId().equals(request.getUserId())) {
//            throw new InternalException(ResponseCode.ROOM_CHAT_CREATE_FAIL);
//        }
//        String chatId = UUID.randomUUID().toString();
//        ChatRoom chatRoomSender = ChatRoom.builder()
//                .chatId(chatId)
//                .senderId(request.getUserId())
//                .recipientId(request.getRecipientId())
//                .build();
//        ChatRoom chatRoomRecipient = ChatRoom.builder()
//                .chatId(chatId)
//                .senderId(request.getRecipientId())
//                .recipientId(request.getUserId())
//                .build();
//        chatRoomService.save(chatRoomRecipient);
//        chatRoomService.save(chatRoomSender);
//        return new CreateRoomChatResponse(iUserMapper.toUserDto(userRecipient), new ChatRoomDto(chatRoomSender));
//    }
//}
