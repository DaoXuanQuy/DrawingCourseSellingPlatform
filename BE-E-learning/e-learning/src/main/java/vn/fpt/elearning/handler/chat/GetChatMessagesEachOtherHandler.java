//package vn.hcmute.elearning.handler.chat;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//import core.vn.fpt.elearning.PageResponseData;
//import core.vn.fpt.elearning.RequestHandler;
//import request.chat.dtos.vn.fpt.elearning.GetChatMessagesEachOtherRequest;
//import vn.hcmute.elearning.dtos.chat.response.GetChatMessagesEachOtherResponse;
//import vn.hcmute.elearning.entity.chat.ChatMessage;
//import vn.hcmute.elearning.service.chat.ChatMessageService;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class GetChatMessagesEachOtherHandler extends RequestHandler<GetChatMessagesEachOtherRequest, PageResponseData<ChatMessage>> {
//    private final ChatMessageService chatMessageService;
//    @Override
//    public PageResponseData<ChatMessage> handle(GetChatMessagesEachOtherRequest request) {
//        return new PageResponseData<>(chatMessageService.getChatMessagesEachOther(request.getSenderId(), request.getRecipientId(), request.getPageable()));
//    }
//}
