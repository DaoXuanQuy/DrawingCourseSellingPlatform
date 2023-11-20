package vn.fpt.elearning.handler.address;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.client.IRestClient;
import vn.fpt.elearning.core.RequestHandler;
import vn.fpt.elearning.dtos.address.request.GetDistrictsByProvinceRequest;
import vn.fpt.elearning.dtos.address.response.GetDistrictsByProvinceResponse;
import vn.fpt.elearning.model.ProvinceDto;

import java.util.Objects;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetDistrictsByProvinceHandler extends RequestHandler<GetDistrictsByProvinceRequest, GetDistrictsByProvinceResponse> {

    private final IRestClient restClient;
    @Value("${address-client.get-districts-url}")
    private String host;

    @Override
    public GetDistrictsByProvinceResponse handle(GetDistrictsByProvinceRequest request) {
        String url = String.format(host, request.getProvinceCode());
        ResponseEntity<ProvinceDto> response = restClient.callAPI(url, HttpMethod.GET, new HttpHeaders(), null, ProvinceDto.class);
        return new GetDistrictsByProvinceResponse(Objects.requireNonNull(response.getBody()).getDistricts());
    }
}
