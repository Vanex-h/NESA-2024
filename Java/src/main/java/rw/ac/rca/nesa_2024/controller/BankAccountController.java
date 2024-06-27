package rw.ac.rca.nesa_2024.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nesa_2024.dto.requests.AddBankAccountDTO;
import rw.ac.rca.nesa_2024.dto.requests.DepositDTO;
import rw.ac.rca.nesa_2024.dto.requests.TransferDTO;
import rw.ac.rca.nesa_2024.dto.requests.WithdrawDTO;
import rw.ac.rca.nesa_2024.error.CustomException;
import rw.ac.rca.nesa_2024.service.BankingService;
import rw.ac.rca.nesa_2024.service.CustomerService;

@RestController
@RequestMapping("/api/v1/bankAccounts")
@RequiredArgsConstructor
public class BankAccountController {
    private final CustomerService customerService;
    private final BankingService bankService;

    @PostMapping("/addBankAccount")
    public ResponseEntity<?> addBankAccount(AddBankAccountDTO createBankDTO) {
        try {
            return ResponseEntity.ok(bankService.addBanking(createBankDTO));
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    @GetMapping("/getBankAccounts")
    public ResponseEntity<?> getBankAccounts(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return ResponseEntity.ok(bankService.getBankAccounts(pageable));
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    @PatchMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody DepositDTO depositDTO) {
        try {
            return ResponseEntity.ok(bankService.deposit(depositDTO));
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    @PatchMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody WithdrawDTO withdrawDTO) {
        try {
            return ResponseEntity.ok(bankService.withdraw(withdrawDTO));
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    @PatchMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody TransferDTO transferDTO) {
        try {
            return ResponseEntity.ok(bankService.transfer(transferDTO));
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }
}



