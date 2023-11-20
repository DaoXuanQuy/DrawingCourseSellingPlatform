package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.DisplayStatus;
import vn.fpt.elearning.enums.DocumentType;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "document")
public class Document extends Auditable<String> {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false, referencedColumnName = "id")
    private Lesson lesson;

    @Column(nullable = false, columnDefinition = "TEXT", name = "document_name")
    private String documentName;

    @Column(columnDefinition = "TEXT", name = "content")
    private String content;

    @Column(columnDefinition = "TEXT", name = "document_url")
    private String documentUrl;

    @Column(columnDefinition = "TEXT", name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    private DisplayStatus displayStatus;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;
}
