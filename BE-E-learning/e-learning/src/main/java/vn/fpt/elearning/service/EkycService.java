package vn.fpt.elearning.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import vn.fpt.elearning.client.RestClient;
import vn.fpt.elearning.core.ResponseBase;
import vn.fpt.elearning.entity.Ekyc;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.model.DetectIdCardResponse;
import vn.fpt.elearning.model.IdCardModel;
import vn.fpt.elearning.exception.InternalException;
import vn.fpt.elearning.repository.EkycRepository;
import vn.fpt.elearning.service.interfaces.IEkycService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EkycService implements IEkycService {
    private final EkycRepository ekycRepository;
    private final RestClient restClient;
    private final Gson gson;

    @Value("${ekyc-service.host}")
    private String host;
    @Value("${ekyc-service.key}")
    private String apiKey;
    @Value("${ekyc-service.endpoint.id-card}")
    private String endpoint;

    private HttpHeaders getHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.add("api-key", apiKey);
        return headers;
    }

    @Override
    public Ekyc save(Ekyc ekyc) {
        return ekycRepository.save(ekyc);
    }

    @Override
    public IdCardModel detectIdCard(MultipartFile imageFront, MultipartFile imageBack) {
        HttpHeaders headers = this.getHeader();
        String url = this.host + this.endpoint;
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("imageFront", imageFront.getResource());
        body.add("imageBack", imageBack.getResource());

        ResponseBase<DetectIdCardResponse> responseBase = restClient.callAPI(url, HttpMethod.POST, headers, body, new ParameterizedTypeReference<ResponseBase<DetectIdCardResponse>>() {
        }).getBody();
        if (responseBase == null) {
            throw new InternalException(ResponseCode.OCR_FAILED);
        }
        if (responseBase.getData() == null || responseBase.getData().getIdCardModel() == null) {
            throw new InternalException(ResponseCode.OCR_FAILED);
        }
        IdCardModel idCardModel = responseBase.getData().getIdCardModel();
        if (StringUtils.isBlank(idCardModel.getNo())) {
            throw new InternalException(ResponseCode.OCR_FAILED);
        }
        return responseBase.getData().getIdCardModel();
    }

    @Override
    public Ekyc getById(String id) {
        return ekycRepository.findById(id).orElse(null);
    }

    @Override
    public Ekyc getByUserId(String userId) {
        return ekycRepository.getByCreatedBy(userId);
    }

    @Override
    public List<Ekyc> getByIdCard(String idCard) {
        List<Ekyc> ekycs = ekycRepository.getEkycByNo(idCard);
        if (CollectionUtils.isEmpty(ekycs)) {
            ekycs = new ArrayList<>();
        }
        return ekycs;
    }
}
