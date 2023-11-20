package vn.fpt.elearning.dtos.statistic.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import vn.fpt.elearning.core.BaseResponseData;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors
public class TeacherGetCardsInfoResponse extends BaseResponseData {
    @Schema(description = "Tổng số lượng khóa học")
    private Long totalCourses;
    @Schema(description = "Tổng số lượng học viên")
    private Long totalStudents;
    @Schema(description = "Tổng số lượng hóa đơn thành công")
    private Long totalSuccessInvoices;
    @Schema(description = "Doanh thu")
    private Long balance;

    public TeacherGetCardsInfoResponse(List<Long> result) {
        this.totalCourses = result.get(0);
        this.totalStudents = result.get(1);
        this.totalSuccessInvoices = result.get(2);
        this.balance = result.get(3);
    }
}
