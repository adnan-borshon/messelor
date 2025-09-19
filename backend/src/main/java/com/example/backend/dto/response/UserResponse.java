package com.example.backend.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Integer userId;
    private String username;
    private String email;
    private List<String> roles; // Added roles
    private UserProfileResponse profile;
}