package vn.fpt.elearning.model.email;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailModel {
    private String templateName;
    private String from;
    private String[] to;
    private String subject;
    private boolean isHtml = false;
    private boolean hasAttachment;
    private Map<String, Object> parameterMap;
    private Map<String, Object> attachments;
}
