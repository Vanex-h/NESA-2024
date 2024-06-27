package rw.ac.rca.nesa_2024.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class CreateCustomerDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;

    private Date dob;
}
