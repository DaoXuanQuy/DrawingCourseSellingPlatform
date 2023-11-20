package vn.fpt.elearning.dtos.chat.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class GetChatMessagesEachOtherRequest extends BaseRequestData {
    @NotBlank
    private String senderId;
    @NotBlank
    private String recipientId;

    @JsonIgnore
    private Pageable pageable;
}
