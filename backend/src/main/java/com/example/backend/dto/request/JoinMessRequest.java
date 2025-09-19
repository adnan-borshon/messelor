package com.example.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinMessRequest {
    @NotBlank(message = "Mess code is required")
    private String messCode;
}
