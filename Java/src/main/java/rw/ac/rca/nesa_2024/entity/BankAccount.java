package rw.ac.rca.nesa_2024.entity;

import jakarta.persistence.*;
import lombok.*;
import rw.ac.rca.nesa_2024.audits.TimeStampAudit;
import rw.ac.rca.nesa_2024.enums.EAccountType;

import java.util.Date;
@Entity
@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Table(name = "bank_accounts")
public class BankAccount extends TimeStampAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double amount;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    @Enumerated(EnumType.STRING)
    private EAccountType type;

    private Date bankingDateTime;

    public BankAccount(Long amount, Customer customer, EAccountType type, Date bankingDateTime) {
        this.amount = amount;
        this.customer = customer;
        this.type = type;
        this.bankingDateTime = bankingDateTime;
    }
}
