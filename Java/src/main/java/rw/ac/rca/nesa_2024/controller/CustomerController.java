package rw.ac.rca.nesa_2024.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nesa_2024.dto.CreateCustomerDTO;
import rw.ac.rca.nesa_2024.entity.Customer;
import rw.ac.rca.nesa_2024.error.CustomException;
import rw.ac.rca.nesa_2024.service.CustomerService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/v1/customers")
@Validated
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class CustomerController {
    @Autowired
    private  CustomerService customerService;

    @GetMapping
    public ResponseEntity<?> getCustomers(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return ResponseEntity.ok(customerService.getAll(pageable));
        } catch (CustomException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/addNewCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody CreateCustomerDTO customer) {
        try {
            Customer c= customerService.addCustomer(customer);
            return ResponseEntity.ok(c);
        } catch (CustomException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // Java
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer id) {
        try {
            customerService.deleteCustomer(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Integer id, @RequestBody CreateCustomerDTO customerDTO) {
        try {
            Customer existingCustomer = customerService.getCustomerById(id);
            if (existingCustomer == null) {
                return ResponseEntity.notFound().build();
            }

            Customer updatedCustomer = customerService.addCustomer(customerDTO);
            return ResponseEntity.ok(updatedCustomer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Integer id) {
        try {
            Customer customer = customerService.getCustomerById(id);
            if (customer == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(customer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
