package vn.fpt.elearning.dtos.forum.category.request;

import lombok.Getter;
import lombok.Setter;
import vn.fpt.elearning.core.BaseID;

@Getter
@Setter
public class UpdateCategoryRequest extends CreateCategoryRequest implements BaseID<String> {

    private String id;
}
