package com.example.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMessRequest {
    @NotBlank(message = "Mess name is required")
    @Size(max = 255, message = "Mess name cannot exceed 255 characters")
    private String messName;

    @NotBlank(message = "Mess code is required")
    @Size(max = 20, message = "Mess code cannot exceed 20 characters")
    private String messCode;

    private String description;
    private String address;

    @DecimalMin(value = "0.0", message = "Monthly service charge must be positive")
    private BigDecimal monthlyServiceCharge;

    @Min(value = 1, message = "Max members must be at least 1")
    private Integer maxMembers;
}