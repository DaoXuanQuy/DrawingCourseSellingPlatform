package vn.fpt.elearning.dtos.admin.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import vn.fpt.elearning.core.BaseRequestData;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UpdateInfoAdminRequest extends BaseRequestData {
    private String id;
    private String fullName;
    private String email;
}
