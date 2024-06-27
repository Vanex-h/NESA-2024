package rw.ac.rca.nesa_2024.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TransferDTO {
    @NotBlank
    private int sourceAccountId;
    @NotBlank
    private int destinationAccountId;
    @NotBlank
    private double amount;
}