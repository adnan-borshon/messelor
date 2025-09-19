package com.example.backend.dto.response;

import com.example.backend.entity.enums.ActivityLevel;
import com.example.backend.entity.enums.Gender;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {
    private Integer userProfileId;
    private String name;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;
    private BigDecimal height;
    private BigDecimal weight;
    private ActivityLevel activityLevel;
    private String dietaryPreferences;
    private String allergies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}