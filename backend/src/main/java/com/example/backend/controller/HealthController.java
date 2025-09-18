package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("app", "up");

        try {
            jdbcTemplate.execute("SELECT 1"); // simple DB query
            status.put("database", "up");
        } catch (Exception e) {
            status.put("database", "down");
        }

        return status;
    }
}
