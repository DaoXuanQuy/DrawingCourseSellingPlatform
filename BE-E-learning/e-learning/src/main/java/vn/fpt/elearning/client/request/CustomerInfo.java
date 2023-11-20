package vn.fpt.elearning.client.request;


import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CustomerInfo {
    private String fullName;
    private String email;

    private String phone;

    private String address;

}