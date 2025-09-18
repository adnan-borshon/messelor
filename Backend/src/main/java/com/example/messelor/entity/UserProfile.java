package com.example.messelor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "user_profile")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_profile_id;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String name;
    private String phone;
    private LocalDate date_of_birth;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Double height;
    private Double weight;
    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;
    @Column(columnDefinition = "text")
    private String dietary_preferences;
    @Column(columnDefinition = "text")
    private String allergies;
    private LocalDateTime created_at;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum ActivityLevel {
        SEDENTARY, LIGHT, MODERATE, ACTIVE, VERY_ACTIVE
    }
}
