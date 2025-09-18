package com.example.backend.payload;

public record LoginRequest(String usernameOrEmail, String password) {}
