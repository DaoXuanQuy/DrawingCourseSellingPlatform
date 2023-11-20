package vn.fpt.elearning.dtos.ekyc.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEkycRequest extends BaseRequestData {
    private String ekycId;
    private String fullName;
    private String birthday;
    private String gender;
    private String province;
    private String district;
    private String ward;
    private String address;
    private String hometown;
    private String cardNo;
    private String issueBy;
    private String issueDate;

}
