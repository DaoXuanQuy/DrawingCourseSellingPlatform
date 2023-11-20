package vn.fpt.elearning.dtos.forum.category.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.forum.ForumCategoryStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class CreateCategoryRequest extends BaseRequestData {

    @NotBlank
    @Size(max = 1000)
    private String title;

    @Size(max = 65536)
    private String description;

    @Schema(example = "ACTIVE")
    private ForumCategoryStatus status;

    private String parentId;
}
