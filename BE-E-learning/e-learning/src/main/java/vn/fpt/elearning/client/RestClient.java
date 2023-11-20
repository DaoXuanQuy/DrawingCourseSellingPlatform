package vn.fpt.elearning.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import vn.fpt.elearning.enums.ResponseCode;
import vn.fpt.elearning.exception.InternalException;

@Slf4j
@Component
public class RestClient implements IRestClient {
    private final ObjectMapper mapper = new ObjectMapper();

    private final RestTemplate restTemplate;

    public RestClient(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public <T> ResponseEntity<T> callAPI(String url, HttpMethod httpMethod, HttpHeaders httpHeaders, Object request, Class<T> responseClassType) {
        log.info("Start using rest client connect to the outside server");
        try {
            HttpEntity<Object> httpEntity = new HttpEntity<>(request, httpHeaders);

            log.info("Calling EXTERNAL {} {}", httpMethod, url);

            return restTemplate.exchange(url, httpMethod, httpEntity, responseClassType);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw new InternalException(ResponseCode.FAILED);
        }
    }

    @Override
    public ResponseEntity<Object> callAPI(String url, HttpMethod httpMethod, HttpHeaders httpHeaders, Object request) {
        log.info("Start using rest client connect to the outside server");
        try {
            HttpEntity<Object> httpEntity = new HttpEntity<>(request, httpHeaders);

            log.info("Calling EXTERNAL {} {}", httpMethod, url);

            return restTemplate.exchange(url, httpMethod, httpEntity, new ParameterizedTypeReference<>() {});
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw new InternalException(ResponseCode.FAILED);
        }
    }

    @Override
    public <T> ResponseEntity<T> callAPI(String url, HttpMethod httpMethod, HttpHeaders httpHeaders, Object request, ParameterizedTypeReference<T> responseType) {
        log.info("Start using rest client connect to the outside server");
        try {
            HttpEntity<Object> httpEntity = new HttpEntity<>(request, httpHeaders);

            log.info("Calling EXTERNAL {} {}", httpMethod, url);

            return restTemplate.exchange(url, httpMethod, httpEntity, responseType);
        } catch (HttpClientErrorException e) {
            log.error(e.getMessage());
            log.debug(e.getResponseBodyAsString());
            throw new InternalException(ResponseCode.FAILED);
        }
    }

}
