package vn.fpt.elearning.dtos.forum.topic.request;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CreateTopicRequest extends BaseRequestData {

    @NotBlank
    @Size(max = 1000)
    private String title;
    private String tags;
    @NotBlank
    private String categoryId;
    @NotBlank
    private String firstPostContent;
}
