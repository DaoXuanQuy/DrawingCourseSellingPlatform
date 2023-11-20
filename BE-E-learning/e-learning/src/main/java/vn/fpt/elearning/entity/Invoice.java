package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.InvoiceStatus;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoice")
@FieldNameConstants
@Accessors(chain = true)
public class Invoice extends Auditable<String> {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Course course;

    private String payTransactionId;

    @Column(nullable = false, unique = true)
    private String code;

    private String payLinkCode;

    private Long timeout;

    @Column(name = "url", columnDefinition = "TEXT")
    private String url;

    private String virtualAccount;

    private String description;

    private long amount;

    private LocalDateTime time;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;
}
