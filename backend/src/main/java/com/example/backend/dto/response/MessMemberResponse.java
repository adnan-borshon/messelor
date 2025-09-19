package com.example.backend.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessMemberResponse {
    private Integer messMemberId;
    private String username;
    private String email;
    private String name;
    private LocalDate joinedDate;
    private LocalDate leftDate;
    private Boolean isActive;
    private LocalDateTime createdAt;
}