package vn.fpt.elearning.dtos.review.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.Review;
import vn.fpt.elearning.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse extends BaseResponseData {
    private String id;
    private String userId;
    private String avatar;
    private String fullname;
    private String subject;
    private String content;
    private double star;
    private boolean allowEdit;
    private List<CommentResponse> comments;

    public ReviewResponse(Review review, String userId) {
        this.id = review.getId();
        User user = review.getUser();
        this.userId = user.getId();
        this.fullname = user.getFirstName() + " " + user.getLastName();
        this.avatar = user.getAvatar();
        this.subject = review.getSubject();
        this.content = review.getContent();
        this.star = review.getStar();
        this.allowEdit = StringUtils.equals(this.userId, userId);
        this.comments = review.getComments().stream()
            .map(comment -> new CommentResponse(comment, userId))
            .collect(Collectors.toList());
    }
}
