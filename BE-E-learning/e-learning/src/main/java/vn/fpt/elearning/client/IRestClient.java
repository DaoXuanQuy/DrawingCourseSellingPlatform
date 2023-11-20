package vn.fpt.elearning.client;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public interface IRestClient {
    <T> ResponseEntity<T> callAPI(
            String url,
            HttpMethod httpMethod,
            HttpHeaders httpHeaders,
            Object request,
            Class<T> responseClassType
    );

    ResponseEntity<Object> callAPI(
            String url,
            HttpMethod httpMethod,
            HttpHeaders httpHeaders,
            Object request
    );

    <T> ResponseEntity<T> callAPI(
            String url,
            HttpMethod httpMethod,
            HttpHeaders httpHeaders,
            Object request,
            ParameterizedTypeReference<T> responseType
    );

}
