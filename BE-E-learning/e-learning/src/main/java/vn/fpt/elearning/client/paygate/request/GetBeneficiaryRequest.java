package vn.fpt.elearning.client.paygate.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import vn.fpt.elearning.core.BaseRequestData;
import vn.fpt.elearning.enums.FTTarget;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GetBeneficiaryRequest extends BaseRequestData {


    @NotBlank
    @JsonProperty(namespace = "accountNo")
    private String accountNo;

    @NotBlank
    @JsonProperty(namespace = "bin")
    private String bin;

    @NotNull
    @JsonProperty(namespace = "target")
    private FTTarget target;

}
