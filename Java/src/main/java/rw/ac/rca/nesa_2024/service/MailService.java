package rw.ac.rca.nesa_2024.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import rw.ac.rca.nesa_2024.entity.Customer;
import rw.ac.rca.nesa_2024.enums.ETransactionType;
import rw.ac.rca.nesa_2024.error.CustomException;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    private final SpringTemplateEngine templateEngine;

    @Value("${app.frontend.support-email}")
    private String supportEmail;


    public void sendDepositOrWithdrawNotification(Customer customer, double amount, ETransactionType type) {
        try {
            MimeMessage message = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            Context context = new Context();
            context.setVariable("fullName", customer.getFirstName() + " " + customer.getLastName());
            context.setVariable("amount", amount);
            context.setVariable("supportEmail", supportEmail);
            context.setVariable("currentYear", LocalDate.now().getYear());

            String htmlContent = templateEngine.process(type == ETransactionType.DEPOSIT ? "deposit-successful" : "withdraw-successful", context);

            helper.setTo(customer.getEmail());
            helper.setSubject(type == ETransactionType.DEPOSIT ? "Deposit Successful" : "Withdrawal Successful");
            helper.setText(htmlContent, true);
            System.out.println("Sending email to " + customer.getEmail());
            System.out.println("Email content: " + message);
            this.mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new CustomException("Error sending message");
        }
    }
}