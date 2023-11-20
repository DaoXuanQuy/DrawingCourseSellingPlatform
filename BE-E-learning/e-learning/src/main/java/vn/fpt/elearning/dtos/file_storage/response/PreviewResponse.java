package vn.fpt.elearning.dtos.file_storage.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.http.MediaType;
import vn.fpt.elearning.core.BaseResponseData;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class PreviewResponse extends BaseResponseData {
    private String filename;
    private byte[] bytes;
    private MediaType contentType;
}
