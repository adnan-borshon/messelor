package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mess")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Mess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mess_id;
    private String mess_name;
    @Column(unique = true)
    private String messCode;
    @Column(columnDefinition = "text")
    private String description;
    @Column(columnDefinition = "text")
    private String address;
    private Double monthly_service_charge;
    private Integer max_members;
    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private Boolean is_active;
}
