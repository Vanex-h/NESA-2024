package rw.ac.rca.nesa_2024.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CreateBankDTO {
    private Integer customerId;
    private String account;
    private Long amount;
    private Date bankingDateTime;
}
