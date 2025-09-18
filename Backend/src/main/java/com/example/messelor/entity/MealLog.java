package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "meal_log")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer meal_log_id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "mess_id")
    private Mess mess;
    @ManyToOne
    @JoinColumn(name = "meal_type_id")
    private MealType meal_type;
    private LocalDate meal_date;
    private LocalDateTime logged_at;
    @ManyToOne
    @JoinColumn(name = "logged_by")
    private User logged_by;
    @Column(columnDefinition = "text")
    private String notes;
}
