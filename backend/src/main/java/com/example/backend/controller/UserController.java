package com.example.backend.controller;

import com.example.backend.dto.request.UserProfileRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.UserProfileResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        try {
            List<UserResponse> users = userService.getAllUsers();
            return ResponseEntity.ok(ApiResponse.success(users, "Users retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve users: " + e.getMessage()));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Integer userId) {
        try {
            UserResponse user = userService.getUserById(userId);
            return ResponseEntity.ok(ApiResponse.success(user, "User retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User not found: " + e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse user = userService.getUserByUsername(userDetails.getUsername());
            return ResponseEntity.ok(ApiResponse.success(user, "Current user retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve current user: " + e.getMessage()));
        }
    }

    @PostMapping("/{userId}/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> createOrUpdateProfile(
            @PathVariable Integer userId,
            @Valid @RequestBody UserProfileRequest request,
            Authentication authentication) {
        try {
            // Get current user to verify permission
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            // Check if user is updating their own profile
            if (!currentUser.getUserId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.error("You can only update your own profile"));
            }

            UserProfileResponse profile = userService.createOrUpdateProfile(userId, request);
            return ResponseEntity.ok(ApiResponse.success(profile, "Profile updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update profile: " + e.getMessage()));
        }
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getUserProfile(@PathVariable Integer userId) {
        try {
            UserProfileResponse profile = userService.getUserProfile(userId);
            return ResponseEntity.ok(ApiResponse.success(profile, "Profile retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Profile not found: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(
            @PathVariable Integer userId,
            Authentication authentication) {
        try {
            // Get current user to verify permission
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            // Check if user is deleting their own account
            if (!currentUser.getUserId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.error("You can only delete your own account"));
            }

            String result = userService.deleteUser(userId);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to delete user: " + e.getMessage()));
        }
    }

    // ========================================
    // ROLE MANAGEMENT - UPDATED PERMISSIONS
    // ========================================

    /**
     * Assign role to user - Available to SUPER_ADMIN and MESS_ADMIN
     */
    @PostMapping("/{userId}/roles/{roleName}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN') or hasAuthority('MESS_ADMIN')")
    public ResponseEntity<ApiResponse<String>> assignRole(
            @PathVariable Integer userId,
            @PathVariable String roleName,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            // Check permissions based on role
            String result = userService.assignRoleToUser(userId, roleName, currentUser);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to assign role: " + e.getMessage()));
        }
    }

    /**
     * Remove role from user - Available to SUPER_ADMIN and MESS_ADMIN
     */
    @DeleteMapping("/{userId}/roles/{roleName}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN') or hasAuthority('MESS_ADMIN')")
    public ResponseEntity<ApiResponse<String>> removeRole(
            @PathVariable Integer userId,
            @PathVariable String roleName,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            // Check permissions based on role
            String result = userService.removeRoleFromUser(userId, roleName, currentUser);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to remove role: " + e.getMessage()));
        }
    }

    /**
     * Get users in mess - Available to MESS_ADMIN for their mess members
     */
    @GetMapping("/mess/{messId}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN') or hasAuthority('MESS_ADMIN')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsersInMess(
            @PathVariable Integer messId,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            List<UserResponse> users = userService.getUsersInMess(messId, currentUser);
            return ResponseEntity.ok(ApiResponse.success(users, "Mess users retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve mess users: " + e.getMessage()));
        }
    }
}