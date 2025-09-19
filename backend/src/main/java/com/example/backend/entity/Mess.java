package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "mess")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mess_id")
    private Integer messId;

    @Column(name = "mess_name", nullable = false)
    private String messName;

    @Column(name = "mess_code", unique = true, nullable = false)
    private String messCode;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "monthly_service_charge")
    private BigDecimal monthlyServiceCharge;

    @Column(name = "max_members")
    private Integer maxMembers;

    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "user_id")
    private User manager;

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Builder.Default
    @Column(name = "is_active")
    private Boolean isActive = true;
}
