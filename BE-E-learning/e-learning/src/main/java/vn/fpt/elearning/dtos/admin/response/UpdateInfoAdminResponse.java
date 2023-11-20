package vn.fpt.elearning.dtos.admin.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.admin.AdministratorDto;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateInfoAdminResponse extends BaseResponseData {
    private AdministratorDto administrator;
}
