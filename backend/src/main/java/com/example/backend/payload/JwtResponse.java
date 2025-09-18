package com.example.backend.payload;

import java.util.List;

public record JwtResponse(String token, String username, List<String> roles) {}
