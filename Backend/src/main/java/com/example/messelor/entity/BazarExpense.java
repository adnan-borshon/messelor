package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bazar_expense")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BazarExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer expense_id;
    @ManyToOne
    @JoinColumn(name = "mess_id")
    private Mess mess;
    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;
    private Integer category_id;
    private LocalDate expense_date;
    private Double total_amount;
    @Column(columnDefinition = "text")
    private String description;
    @ManyToOne
    @JoinColumn(name = "entered_by")
    private User entered_by;
    private LocalDateTime entered_at;
    @Enumerated(EnumType.STRING)
    private PaymentMethod payment_method;
    private Boolean is_guest_meal;

    public enum PaymentMethod {
        CASH, CARD, UPI, BANK_TRANSFER, CREDIT
    }
}
