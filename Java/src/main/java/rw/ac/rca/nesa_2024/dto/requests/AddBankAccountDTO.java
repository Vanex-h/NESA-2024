package rw.ac.rca.nesa_2024.dto.requests;

import lombok.Data;
import rw.ac.rca.nesa_2024.enums.EAccountType;

@Data
public class AddBankAccountDTO {
    private int customerId;
    private EAccountType type;
}
