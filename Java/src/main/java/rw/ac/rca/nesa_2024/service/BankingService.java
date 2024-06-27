package rw.ac.rca.nesa_2024.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.nesa_2024.dto.requests.AddBankAccountDTO;
import rw.ac.rca.nesa_2024.dto.requests.DepositDTO;
import rw.ac.rca.nesa_2024.dto.requests.TransferDTO;
import rw.ac.rca.nesa_2024.dto.requests.WithdrawDTO;
import rw.ac.rca.nesa_2024.entity.BankAccount;
import rw.ac.rca.nesa_2024.entity.Customer;
import rw.ac.rca.nesa_2024.enums.ETransactionType;
import rw.ac.rca.nesa_2024.error.CustomException;
import rw.ac.rca.nesa_2024.repository.BankingRepository;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BankingService {
    private final BankingRepository bankingRepository;
    private final CustomerService customerService;
    private final MailService mailService;

    public BankingService(BankingRepository bankingRepository, CustomerService customerService, MailService mailService) {
        this.bankingRepository = bankingRepository;
        this.customerService = customerService;
        this.mailService = mailService;
    }

    public BankAccount addBanking(AddBankAccountDTO addBankAccountDTO) {
        try {
            Customer customer = customerService.getCustomerById(addBankAccountDTO.getCustomerId());
            if (customer == null) {
                throw new CustomException("Customer not found");
            } else if (getBankAccountByCustomer(customer).isPresent()){
                throw new CustomException("Customer already has a bank account: ");
            }
            BankAccount bankAccount = new BankAccount();
            bankAccount.setCustomer(customer);
            bankAccount.setAmount(0);
            bankAccount.setType(addBankAccountDTO.getType());
            bankAccount.setBankingDateTime(new Date());
            return bankingRepository.save(bankAccount);
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }
    public Optional<BankAccount> getBankAccountByCustomer(Customer c){
        return bankingRepository.findByCustomer(c);
    }

    public Page<BankAccount> getBankAccounts(Pageable pageable) {
        return bankingRepository.findAll(pageable);
    }

    public BankAccount deposit(DepositDTO depositDTO) {
        try {
            BankAccount bankAccount = bankingRepository.findById(depositDTO.getAccountId())
                    .orElseThrow(() -> new CustomException("Bank account not found"));

            double newAmount = bankAccount.getAmount() + depositDTO.getAmount();
            bankAccount.setAmount(newAmount);
            mailService.sendDepositOrWithdrawNotification(bankAccount.getCustomer(), depositDTO.getAmount(), ETransactionType.DEPOSIT);
            return bankingRepository.save(bankAccount);
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    public BankAccount withdraw(WithdrawDTO withdrawDTO) {
        try {
            BankAccount bankAccount = bankingRepository.findById(withdrawDTO.getAccountId())
                    .orElseThrow(() -> new CustomException("Bank account not found"));

            double currentAmount = bankAccount.getAmount();
            if (withdrawDTO.getAmount() > currentAmount) {
                throw new CustomException("Insufficient balance");
            }

            double newAmount = currentAmount - withdrawDTO.getAmount();
            bankAccount.setAmount(newAmount);
            mailService.sendDepositOrWithdrawNotification(bankAccount.getCustomer(), withdrawDTO.getAmount(), ETransactionType.WITHDRAWAL);
            return bankingRepository.save(bankAccount);
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    public List<BankAccount> transfer(TransferDTO transferDTO) {
        try {
            BankAccount sourceBankAccount = bankingRepository.findById(transferDTO.getSourceAccountId())
                    .orElseThrow(() -> new CustomException("Source bank account not found"));

            BankAccount destinationBankAccount = bankingRepository.findById(transferDTO.getDestinationAccountId())
                    .orElseThrow(() -> new CustomException("Destination bank account not found"));

            double currentAmount = sourceBankAccount.getAmount();
            if (transferDTO.getAmount() > currentAmount) {
                throw new CustomException("Insufficient balance");
            }

            double newSourceAmount = currentAmount - transferDTO.getAmount();
            sourceBankAccount.setAmount(newSourceAmount);

            double newDestinationAmount = destinationBankAccount.getAmount() + transferDTO.getAmount();
            destinationBankAccount.setAmount(newDestinationAmount);

            BankAccount[] updatedAccounts = new BankAccount[2];
            updatedAccounts[0] = bankingRepository.save(sourceBankAccount);
            updatedAccounts[1] = bankingRepository.save(destinationBankAccount);

            return Arrays.stream(updatedAccounts).toList();
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }
}
