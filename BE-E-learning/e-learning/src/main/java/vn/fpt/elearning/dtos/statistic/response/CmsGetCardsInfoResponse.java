package vn.fpt.elearning.dtos.statistic.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.elearning.core.BaseResponseData;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CmsGetCardsInfoResponse extends BaseResponseData {
    @Schema(description = "Tổng số lượng người dùng")
    private Long totalUsers;
    @Schema(description = "Tổng số lượng giảng viên")
    private Long totalTeacher;
    @Schema(description = "Tổng số lượng khóa học")
    private Long totalCourses;
    @Schema(description = "Tổng số lượng hóa đơn thanh toán thành công")
    private Long totalSuccessInvoices;
    public CmsGetCardsInfoResponse(List<Long> result) {
        this.totalUsers = result.get(0);
        this.totalTeacher = result.get(1);
        this.totalCourses = result.get(2);
        this.totalSuccessInvoices = result.get(3);
    }
}
