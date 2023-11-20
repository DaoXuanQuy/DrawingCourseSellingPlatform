package vn.fpt.elearning.handler.invoice;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.invoice.request.CmsGetAllWithdrawInvoiceRequest;
import vn.fpt.elearning.dtos.invoice.response.GetAllWithdrawInvoiceResponse;
import vn.fpt.elearning.dtos.teacher.response.WithdrawResponse;
import vn.fpt.elearning.entity.WithdrawInvoice;
import vn.fpt.elearning.mapper.IUserMapper;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.IWithdrawInvoiceService;
import vn.fpt.elearning.service.specifications.WithdrawInvoiceSpecification;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CmsGetAllWithdrawInvoiceHandler extends RequestHandler<CmsGetAllWithdrawInvoiceRequest, GetAllWithdrawInvoiceResponse> {
    private final WithdrawInvoiceSpecification specification;
    private final IWithdrawInvoiceService withdrawInvoiceService;
    private final IUserMapper iUserMapper;
    @Override
    public GetAllWithdrawInvoiceResponse handle(CmsGetAllWithdrawInvoiceRequest request) {
        Specification<WithdrawInvoice> spec = Specification.where(specification.equalTeacherId(request.getTeacherId()))
            .and(specification.equalStatus(request.getStatus()))
            .and(specification.likeTxnNumber(request.getTxnNumber()))
            .and(specification.fromDate(request.fromDatetime(request.getFromDate())))
            .and(specification.toDate(request.toDatetime(request.getToDate())));
        Page<WithdrawInvoice> page = withdrawInvoiceService.getAll(spec, request.getPageable());
        List<WithdrawResponse> list = page.getContent().stream()
            .map(withdrawInvoice -> new WithdrawResponse(withdrawInvoice, iUserMapper))
            .collect(Collectors.toList());
        return new GetAllWithdrawInvoiceResponse(list, new Paginate(page));
    }
}
