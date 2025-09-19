package com.example.backend.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    private String userType;
    private Integer userId;
    private List<String> roles; // Added roles

    public JwtResponse(String token, String username, String userType, Integer userId, List<String> roles) {
        this.token = token;
        this.username = username;
        this.userType = userType;
        this.userId = userId;
        this.roles = roles;
    }
}