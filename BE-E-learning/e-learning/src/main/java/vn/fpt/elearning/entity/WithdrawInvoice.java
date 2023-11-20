package vn.fpt.elearning.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.GenericGenerator;
import vn.fpt.elearning.enums.FTStatus;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "withdraw_invoice")
@FieldNameConstants
@Accessors(chain = true)
public class WithdrawInvoice {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Teacher teacher;

    private String referenceNumber;

    private String txnNumber;

    private String accountNo;

    private String toAccountNo;

    private String toAccountName;

    private String toBin;

    private BigDecimal amount;

    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.EAGER)
    private Bank bank;

    @Enumerated(EnumType.STRING)
    private FTStatus status;
}
