package vn.fpt.elearning.client.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckBeneficiaryCoreRequest {

    private String bin;
    private String accountNo;

}