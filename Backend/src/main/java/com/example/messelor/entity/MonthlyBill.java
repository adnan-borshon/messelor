package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "monthly_bill")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bill_id;
    @ManyToOne
    @JoinColumn(name = "mess_id")
    private Mess mess;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Integer billing_month;
    private Integer billing_year;
    private Integer total_meals;
    private Double total_expenseShare;
    private Double total_amount;
    private Double amount_paid;
    private Double balance;
    @Enumerated(EnumType.STRING)
    private BillStatus bill_status;
    private LocalDate generated_date;
    private LocalDate due_date;

    public enum BillStatus {
        GENERATED, SENT, PAID, PARTIALLY_PAID, OVERDUE
    }
}
