package com.example.backend.controller;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.MessResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.SuperAdmin;
import com.example.backend.service.SuperAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/superadmin")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasAuthority('SUPER_ADMIN')")
@RequiredArgsConstructor
public class SuperAdminController {

    private final SuperAdminService superAdminService;

    // User Management Endpoints
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        try {
            List<UserResponse> users = superAdminService.getAllUsers();
            return ResponseEntity.ok(ApiResponse.success(users, "Users retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve users: " + e.getMessage()));
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Integer userId) {
        try {
            UserResponse user = superAdminService.getUserById(userId);
            return ResponseEntity.ok(ApiResponse.success(user, "User retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User not found: " + e.getMessage()));
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<String>> deactivateUser(@PathVariable Integer userId) {
        try {
            String result = superAdminService.deactivateUser(userId);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to deactivate user: " + e.getMessage()));
        }
    }

    // Mess Management Endpoints
    @GetMapping("/messes")
    public ResponseEntity<ApiResponse<List<MessResponse>>> getAllMesses() {
        try {
            List<MessResponse> messes = superAdminService.getAllMesses();
            return ResponseEntity.ok(ApiResponse.success(messes, "Messes retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve messes: " + e.getMessage()));
        }
    }

    @GetMapping("/messes/{messId}")
    public ResponseEntity<ApiResponse<MessResponse>> getMessById(@PathVariable Integer messId) {
        try {
            MessResponse mess = superAdminService.getMessById(messId);
            return ResponseEntity.ok(ApiResponse.success(mess, "Mess retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Mess not found: " + e.getMessage()));
        }
    }

    @PutMapping("/messes/{messId}/deactivate")
    public ResponseEntity<ApiResponse<String>> deactivateMess(@PathVariable Integer messId) {
        try {
            String result = superAdminService.deactivateMess(messId);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to deactivate mess: " + e.getMessage()));
        }
    }

    @PutMapping("/messes/{messId}/activate")
    public ResponseEntity<ApiResponse<String>> activateMess(@PathVariable Integer messId) {
        try {
            String result = superAdminService.activateMess(messId);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to activate mess: " + e.getMessage()));
        }
    }

    // Super Admin Management
    @GetMapping("/superadmins")
    public ResponseEntity<ApiResponse<List<SuperAdmin>>> getAllSuperAdmins() {
        try {
            List<SuperAdmin> superAdmins = superAdminService.getAllSuperAdmins();
            return ResponseEntity.ok(ApiResponse.success(superAdmins, "Super admins retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve super admins: " + e.getMessage()));
        }
    }

    @PutMapping("/superadmins/{superAdminId}/deactivate")
    public ResponseEntity<ApiResponse<String>> deactivateSuperAdmin(@PathVariable Integer superAdminId) {
        try {
            String result = superAdminService.deactivateSuperAdmin(superAdminId);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to deactivate super admin: " + e.getMessage()));
        }
    }

    @PutMapping("/superadmins/{superAdminId}/activate")
    public ResponseEntity<ApiResponse<String>> activateSuperAdmin(@PathVariable Integer superAdminId) {
        try {
            String result = superAdminService.activateSuperAdmin(superAdminId);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to activate super admin: " + e.getMessage()));
        }
    }

    // System Statistics
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<String>> getSystemStats() {
        try {
            String stats = superAdminService.getSystemStats();
            return ResponseEntity.ok(ApiResponse.success(stats, "System statistics retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve system stats: " + e.getMessage()));
        }
    }
}