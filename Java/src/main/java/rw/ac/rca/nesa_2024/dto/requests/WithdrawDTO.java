package rw.ac.rca.nesa_2024.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class WithdrawDTO {
    @NotBlank
    private int accountId;
    @NotBlank
    private double amount;
}