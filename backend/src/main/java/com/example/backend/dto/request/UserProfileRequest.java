package com.example.backend.dto.request;

import com.example.backend.entity.enums.ActivityLevel;
import com.example.backend.entity.enums.Gender;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String phone;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    private Gender gender;

    @DecimalMin(value = "0.0", message = "Height must be positive")
    private BigDecimal height;

    @DecimalMin(value = "0.0", message = "Weight must be positive")
    private BigDecimal weight;

    private ActivityLevel activityLevel;
    private String dietaryPreferences;
    private String allergies;
}