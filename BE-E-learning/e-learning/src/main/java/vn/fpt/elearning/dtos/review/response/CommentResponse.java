package vn.fpt.elearning.dtos.review.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.Comment;
import vn.fpt.elearning.entity.User;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse extends BaseResponseData {
    private String id;
    private String userId;
    private String fullname;
    private String comment;
    private boolean allowEdit;

    public CommentResponse(Comment comment, String userId) {
        this.id = comment.getId();
        User user = comment.getUser();
        this.userId = user.getId();
        this.fullname = user.getFirstName() + " "  + user.getLastName();
        this.comment = comment.getComment();
        this.allowEdit = StringUtils.equals(user.getId(), userId);
    }
}
