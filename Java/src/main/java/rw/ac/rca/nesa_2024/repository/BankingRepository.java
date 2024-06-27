package rw.ac.rca.nesa_2024.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.nesa_2024.entity.BankAccount;
import rw.ac.rca.nesa_2024.entity.Customer;

import java.util.Optional;

@Repository
public interface BankingRepository extends JpaRepository<BankAccount, Integer> {
    Optional<BankAccount> findByCustomer(Customer customer);

}
