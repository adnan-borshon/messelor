package com.example.backend.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessResponse {
    private Integer messId;
    private String messName;
    private String messCode;
    private String description;
    private String address;
    private BigDecimal monthlyServiceCharge;
    private Integer maxMembers;
    private Integer currentMembers;
    private String managerUsername;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
}