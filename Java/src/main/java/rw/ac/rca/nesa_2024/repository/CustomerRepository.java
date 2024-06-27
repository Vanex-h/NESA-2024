package rw.ac.rca.nesa_2024.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import rw.ac.rca.nesa_2024.entity.Customer;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c where c.email= ?1")
    Optional<Customer> findCustomerByEmail(String email);
    @Query("SELECT c FROM Customer c where c.id= ?1")
    Optional<Customer> findCustomerById(Integer id);
}

