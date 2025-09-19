package com.example.backend.controller;

import com.example.backend.dto.request.CreateMessRequest;
import com.example.backend.dto.request.JoinMessRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.MessMemberResponse;
import com.example.backend.dto.response.MessResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.service.MessService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mess")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MessController {

    private final MessService messService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<MessResponse>> createMess(
            @Valid @RequestBody CreateMessRequest request,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            MessResponse mess = messService.createMess(currentUser.getUserId(), request);
            return ResponseEntity.ok(ApiResponse.success(mess, "Mess created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create mess: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MessResponse>>> getAllMesses() {
        try {
            List<MessResponse> messes = messService.getAllMesses();
            return ResponseEntity.ok(ApiResponse.success(messes, "Messes retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve messes: " + e.getMessage()));
        }
    }

    @GetMapping("/{messId}")
    public ResponseEntity<ApiResponse<MessResponse>> getMessById(@PathVariable Integer messId) {
        try {
            MessResponse mess = messService.getMessById(messId);
            return ResponseEntity.ok(ApiResponse.success(mess, "Mess retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Mess not found: " + e.getMessage()));
        }
    }

    @GetMapping("/code/{messCode}")
    public ResponseEntity<ApiResponse<MessResponse>> getMessByCode(@PathVariable String messCode) {
        try {
            MessResponse mess = messService.getMessByCode(messCode);
            return ResponseEntity.ok(ApiResponse.success(mess, "Mess retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Mess not found: " + e.getMessage()));
        }
    }

    @GetMapping("/my-messes")
    public ResponseEntity<ApiResponse<List<MessResponse>>> getMyMesses(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            List<MessResponse> messes = messService.getMessesByManager(currentUser.getUserId());
            return ResponseEntity.ok(ApiResponse.success(messes, "Your messes retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve your messes: " + e.getMessage()));
        }
    }

    @GetMapping("/joined")
    public ResponseEntity<ApiResponse<List<MessResponse>>> getJoinedMesses(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            List<MessResponse> messes = messService.getUserMesses(currentUser.getUserId());
            return ResponseEntity.ok(ApiResponse.success(messes, "Joined messes retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve joined messes: " + e.getMessage()));
        }
    }

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<String>> joinMess(
            @Valid @RequestBody JoinMessRequest request,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            String result = messService.joinMess(currentUser.getUserId(), request);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to join mess: " + e.getMessage()));
        }
    }

    @PostMapping("/{messId}/leave")
    public ResponseEntity<ApiResponse<String>> leaveMess(
            @PathVariable Integer messId,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            String result = messService.leaveMess(currentUser.getUserId(), messId);
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to leave mess: " + e.getMessage()));
        }
    }

    @GetMapping("/{messId}/members")
    public ResponseEntity<ApiResponse<List<MessMemberResponse>>> getMessMembers(@PathVariable Integer messId) {
        try {
            List<MessMemberResponse> members = messService.getMessMembers(messId);
            return ResponseEntity.ok(ApiResponse.success(members, "Mess members retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to retrieve mess members: " + e.getMessage()));
        }
    }

    @PutMapping("/{messId}")
    public ResponseEntity<ApiResponse<String>> updateMess(
            @PathVariable Integer messId,
            @Valid @RequestBody CreateMessRequest request,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            String result = messService.updateMess(messId, request, currentUser.getUserId());
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update mess: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{messId}")
    public ResponseEntity<ApiResponse<String>> deleteMess(
            @PathVariable Integer messId,
            Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            UserResponse currentUser = userService.getUserByUsername(userDetails.getUsername());

            String result = messService.deleteMess(messId, currentUser.getUserId());
            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to delete mess: " + e.getMessage()));
        }
    }
}