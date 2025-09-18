package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "payment")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer payment_id;
    @ManyToOne
    @JoinColumn(name = "bill_id")
    private MonthlyBill bill;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Double amount;
    private LocalDate payment_date;
    @Enumerated(EnumType.STRING)
    private PaymentMethod payment_method;
    private String transaction_reference;
    @Column(columnDefinition = "text")
    private String notes;
    private Double deviation_percentage;

    public enum PaymentMethod {
        CASH, CARD, UPI, BANK_TRANSFER, CHEQUE
    }
}
