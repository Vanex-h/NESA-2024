package rw.ac.rca.nesa_2024.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rw.ac.rca.nesa_2024.audits.TimeStampAudit;
import rw.ac.rca.nesa_2024.enums.ETransactionType;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "transactions")
@NoArgsConstructor
@AllArgsConstructor
public class Transaction extends TimeStampAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private BankAccount account;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    private Long amount;

    @Enumerated(EnumType.STRING)
    private ETransactionType type;

    private Date bankingDateTime;
}
