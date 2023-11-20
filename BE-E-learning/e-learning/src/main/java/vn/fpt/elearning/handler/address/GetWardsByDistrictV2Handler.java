package vn.fpt.elearning.handler.address;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.address.request.GetWardsByDistrictV2Request;
import vn.fpt.elearning.dtos.address.response.GetWardsByDistrictV2Response;
import vn.fpt.elearning.entity.Ward;
import vn.fpt.elearning.model.WardModel;
import vn.fpt.elearning.service.AddressService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GetWardsByDistrictV2Handler extends RequestHandler<GetWardsByDistrictV2Request, GetWardsByDistrictV2Response> {
    private final AddressService addressService;
    @Override
    public GetWardsByDistrictV2Response handle(GetWardsByDistrictV2Request request) {
        List<Ward> wards = addressService.getListWardsByDistrictId(request.getDistrictId());
        List<WardModel> wardModels = wards.parallelStream().map(WardModel::new).collect(Collectors.toList());
        return new GetWardsByDistrictV2Response(wardModels);
    }
}
