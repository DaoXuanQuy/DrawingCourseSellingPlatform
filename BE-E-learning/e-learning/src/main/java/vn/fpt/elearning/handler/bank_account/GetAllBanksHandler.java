package vn.fpt.elearning.handler.bank_account;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.bank_account.request.GetAllBanksRequest;
import vn.fpt.elearning.dtos.bank_account.response.BankResponse;
import vn.fpt.elearning.dtos.bank_account.response.GetAllBanksResponse;
import vn.fpt.elearning.entity.Bank;
import vn.fpt.elearning.utils.Paginate;
import vn.fpt.elearning.service.interfaces.IBankService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GetAllBanksHandler extends RequestHandler<GetAllBanksRequest, GetAllBanksResponse> {
    private final IBankService bankService;

    @Override
    public GetAllBanksResponse handle(GetAllBanksRequest request) {
        Page<Bank> page = bankService.getAll(request.getSpecification(), request.getPageable());
        List<BankResponse> response = page.stream().parallel().map(BankResponse::new).collect(Collectors.toList());
        return new GetAllBanksResponse(response,new Paginate(page));
    }
}
