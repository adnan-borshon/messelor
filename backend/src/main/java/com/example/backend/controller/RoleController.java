package com.example.backend.controller;


import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.RoleResponse;
import com.example.backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    /**
     * Get all roles - Available to SUPER_ADMIN and MESS_ADMIN
     */
    @GetMapping
    @PreAuthorize("hasAuthority('SUPER_ADMIN') or hasAuthority('MESS_ADMIN')")
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {
        try {
            List<RoleResponse> roles = roleService.getAllRoles();
            return ResponseEntity.ok(ApiResponse.success(roles, "Roles retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve roles: " + e.getMessage()));
        }
    }

    /**
     * Get roles that MESS_ADMIN can assign - Filtered list for MESS_ADMIN
     */
    @GetMapping("/assignable")
    @PreAuthorize("hasAuthority('SUPER_ADMIN') or hasAuthority('MESS_ADMIN')")
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAssignableRoles(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            boolean isSuperAdmin = userDetails.getAuthorities().stream()
                    .anyMatch(auth -> auth.getAuthority().equals("SUPER_ADMIN"));

            List<RoleResponse> roles = roleService.getAssignableRoles(isSuperAdmin);
            return ResponseEntity.ok(ApiResponse.success(roles, "Assignable roles retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve assignable roles: " + e.getMessage()));
        }
    }

    /**
     * Create role - Only SUPER_ADMIN can create new roles
     */
    @PostMapping
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(
            @RequestParam String roleName,
            @RequestParam(required = false) String description) {
        try {
            RoleResponse role = roleService.createRole(roleName, description);
            return ResponseEntity.ok(ApiResponse.success(role, "Role created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create role: " + e.getMessage()));
        }
    }
}