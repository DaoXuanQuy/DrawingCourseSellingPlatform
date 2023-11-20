package vn.fpt.elearning.model.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotifyChatModel {
    private String senderId;
    private int totalNewMessage;
}
