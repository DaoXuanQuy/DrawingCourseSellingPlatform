package vn.fpt.elearning.dtos.statistic.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;
import vn.fpt.elearning.model.TeacherStatisticModel;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherGetStatisticResponse extends BaseResponseData {
    private List<TeacherStatisticModel> statistics;
}
