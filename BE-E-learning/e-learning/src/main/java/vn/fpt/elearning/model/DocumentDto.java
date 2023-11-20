package vn.fpt.elearning.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import vn.fpt.elearning.enums.DisplayStatus;
import vn.fpt.elearning.enums.DocumentType;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class DocumentDto {
    private String id;
    private String documentName;
    private String content;
    private String documentUrl;
    private DocumentType documentType;
    private String description;
    private DisplayStatus displayStatus;
    private LocalDateTime createDate;
    private boolean done = false;
}
