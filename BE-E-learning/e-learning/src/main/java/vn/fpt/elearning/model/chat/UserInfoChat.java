package vn.fpt.elearning.model.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoChat {
    private String id;

    private String avatar;

    private String firstName;

    private String lastName;

    private String phone;

    private int totalNewMessage;

    private Boolean isOnline;
}
