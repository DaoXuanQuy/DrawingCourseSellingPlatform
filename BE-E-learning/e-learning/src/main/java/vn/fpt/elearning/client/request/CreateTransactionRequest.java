package vn.fpt.elearning.client.request;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CreateTransactionRequest {
    private String refTransactionId;
    private Long amount;
    private String description;
    private Long timeout;
    private String title;
    private String language;
    private CustomerInfo customerInfo;
    private String successUrl;
    private String failUrl;
    private Integer redirectAfter;
    private String bankAccountNo;

}