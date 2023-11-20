package vn.fpt.elearning.client.paygate.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import vn.fpt.elearning.core.BaseRequestData;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetBalanceRequest extends BaseRequestData {
    @NotBlank
    private String accountNo;

}
