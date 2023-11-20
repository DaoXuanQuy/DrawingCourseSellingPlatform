//package vn.hcmute.elearning.handler.chat;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.stereotype.Component;
//import core.vn.fpt.elearning.PageResponseData;
//import core.vn.fpt.elearning.RequestHandler;
//import request.chat.dtos.vn.fpt.elearning.GetChatFriendRecentRequest;
//import entity.vn.fpt.elearning.User;
//import vn.hcmute.elearning.entity.chat.ChatRoom;
//import mapper.vn.fpt.elearning.IUserMapper;
//import chat.model.vn.fpt.elearning.UserInfoChat;
//import vn.hcmute.elearning.service.chat.ChatMessageService;
//import vn.hcmute.elearning.service.chat.ChatRoomService;
//import interfaces.service.vn.fpt.elearning.IUserService;
//
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//public class GetChatFriendRecentHandler extends RequestHandler<GetChatFriendRecentRequest, PageResponseData<UserInfoChat>> {
//    private final IUserService iUserService;
//    private final IUserMapper iUserMapper;
//    private final ChatRoomService chatRoomService;
//    private final ChatMessageService chatMessageService;
//
//    @Override
//    public PageResponseData<UserInfoChat> handle(GetChatFriendRecentRequest request) {
//        Page<User> page = iUserService.getFriendChatRecent(request.getUserId(), request.getPageable());
//        List<UserInfoChat> userInfoChats = iUserMapper.toListUserInfoChat(page.getContent());
//        userInfoChats.forEach(data ->{
//            ChatRoom chatRoom = chatRoomService.getRoomByUserAndRecipient(request.getUserId(), data.getId());
//            data.setTotalNewMessage(chatMessageService.countMessage(data.getId(), chatRoom.getChatId(), false));
//        });
//        return new PageResponseData<>(userInfoChats, page);
//    }
//}
