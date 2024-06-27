package rw.ac.rca.nesa_2024.service;

import io.swagger.v3.oas.annotations.servers.Server;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.nesa_2024.dto.CreateCustomerDTO;
import rw.ac.rca.nesa_2024.entity.Customer;
import rw.ac.rca.nesa_2024.error.CustomException;
import rw.ac.rca.nesa_2024.repository.CustomerRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    private boolean isValidPhoneNumberFormat(String phoneNumber) {
        String digitsOnly = phoneNumber.replaceAll("[^\\d]", "");

        // Check if the remaining string is exactly 10 digits
        return digitsOnly.length() == 10;
    }

    private boolean isValidDateFormat(Date date) {
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdf2 = new SimpleDateFormat("dd-MM-yyyy");

        // Set lenient to false to ensure strict date parsing
        sdf1.setLenient(false);
        sdf2.setLenient(false);

        // Format the date to check if it matches either format
        String formattedDate1 = sdf1.format(date);
        String formattedDate2 = sdf2.format(date);

        // Check if the formatted dates match the original date string
        return formattedDate1.equals(sdf1.format(date)) || formattedDate2.equals(sdf2.format(date));
    }

    public Customer addCustomer(CreateCustomerDTO customer) {
        String email = customer.getEmail();
        String firstName = customer.getFirstName();
        String lastName = customer.getLastName();
        String mobile = customer.getMobile();
        Date date = customer.getDob();

        // Check if email is already in use
        if (customerRepository.findCustomerByEmail(email).isPresent()) {
            throw new CustomException("Email already in use");
        }

        // Validate firstName
        if (firstName == null || firstName.trim().isEmpty() || firstName.trim().length() < 3) {
            throw new CustomException("First Name is required and must be at least three characters long");
        }

        // Validate lastName
        if (lastName == null || lastName.trim().isEmpty() || lastName.trim().length() < 3) {
            throw new CustomException("Last Name is required and must be at least three characters long");
        }
        if (email == null || !email.contains("@") || !email.endsWith(".com") || email.trim().isEmpty()) {
            throw new CustomException("Email must be a valid email address");
        }

        // Validate mobile
        if (mobile == null || mobile.trim().isEmpty() || !isValidPhoneNumberFormat(mobile)) {
            throw new CustomException("Mobile is required and must be a valid phone number");
        }

        // Validate date of birth
        if (date == null) {
            throw new CustomException("Date of Birth is required");
        }

        // Check if date is not in the future
        if (date.after(new Date())) {
            throw new CustomException("Date of Birth cannot be in the future");
        }

        // Validate date format ("yyyy-MM-dd" or "dd-MM-yyyy")
        if (!isValidDateFormat(date)) {
            throw new CustomException("Date of Birth must be in yyyy-MM-dd or dd-MM-yyyy format");
        }

        // Validate email format

        // If all validations pass, create and save the customer
        Customer c = new Customer();
        c.setFirstName(firstName.trim());
        c.setLastName(lastName.trim());
        c.setEmail(email.trim());
        c.setMobile(mobile.trim());
        c.setDob(date);

        return customerRepository.save(c);
    }


    public Customer getCustomerById(Integer Id) {
        System.out.println("The id is " + Id);
        return customerRepository.findById(Id)
                .orElseThrow(() -> new CustomException("User not found with id: " + Id));
    }

    public void deleteCustomer(Integer id) {
        customerRepository.deleteById(id);
    }

    public Page<Customer> getAll(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }
}
