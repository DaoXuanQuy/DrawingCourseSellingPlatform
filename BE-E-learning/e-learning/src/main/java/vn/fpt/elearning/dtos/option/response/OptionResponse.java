package vn.fpt.elearning.dtos.option.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.entity.Option;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class OptionResponse extends BaseResponseData {
    private String id;
    private String optionName;
    private Boolean correct;

    public OptionResponse(Option option) {
        this.id = option.getId();
        this.optionName = option.getOptionName();
        this.correct = option.getCorrect();
    }
    public OptionResponse(Option option, boolean isStudent) {
        this.id = option.getId();
        this.optionName = option.getOptionName();
        if (!isStudent) {
            this.correct = option.getCorrect();
        }
    }
}
