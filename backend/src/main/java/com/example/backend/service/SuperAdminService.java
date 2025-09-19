package com.example.backend.service;

import com.example.backend.dto.response.MessResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.Mess;
import com.example.backend.entity.SuperAdmin;
import com.example.backend.entity.User;
import com.example.backend.repository.MessRepository;
import com.example.backend.repository.SuperAdminRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SuperAdminService {

    private final SuperAdminRepository superAdminRepository;
    private final UserRepository userRepository;
    private final MessRepository messRepository;
    private final UserService userService;
    private final MessService messService;

    // User Management
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    public UserResponse getUserById(Integer userId) {
        return userService.getUserById(userId);
    }

    @Transactional
    public String deactivateUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // In this case, we'll delete the user since we don't have an active field
        // In a real application, you might want to add an isActive field
        userRepository.delete(user);
        return "User deactivated successfully";
    }

    // Mess Management
    public List<MessResponse> getAllMesses() {
        return messService.getAllMesses();
    }

    public MessResponse getMessById(Integer messId) {
        return messService.getMessById(messId);
    }

    @Transactional
    public String deactivateMess(Integer messId) {
        Mess mess = messRepository.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found with id: " + messId));

        mess.setIsActive(false);
        mess.setUpdatedAt(LocalDateTime.now());

        messRepository.save(mess);
        return "Mess deactivated successfully";
    }

    @Transactional
    public String activateMess(Integer messId) {
        Mess mess = messRepository.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found with id: " + messId));

        mess.setIsActive(true);
        mess.setUpdatedAt(LocalDateTime.now());

        messRepository.save(mess);
        return "Mess activated successfully";
    }

    // Super Admin Management
    public List<SuperAdmin> getAllSuperAdmins() {
        return superAdminRepository.findAll();
    }

    @Transactional
    public String deactivateSuperAdmin(Integer superAdminId) {
        SuperAdmin superAdmin = superAdminRepository.findById(superAdminId)
                .orElseThrow(() -> new RuntimeException("Super admin not found with id: " + superAdminId));

        superAdmin.setIsActive(false);
        superAdmin.setUpdatedAt(LocalDateTime.now());

        superAdminRepository.save(superAdmin);
        return "Super admin deactivated successfully";
    }

    @Transactional
    public String activateSuperAdmin(Integer superAdminId) {
        SuperAdmin superAdmin = superAdminRepository.findById(superAdminId)
                .orElseThrow(() -> new RuntimeException("Super admin not found with id: " + superAdminId));

        superAdmin.setIsActive(true);
        superAdmin.setUpdatedAt(LocalDateTime.now());

        superAdminRepository.save(superAdmin);
        return "Super admin activated successfully";
    }

    // Statistics
    public String getSystemStats() {
        long totalUsers = userRepository.count();
        long totalMesses = messRepository.count();
        long activeMesses = messRepository.findByIsActiveTrue().size();
        long totalSuperAdmins = superAdminRepository.count();

        return String.format("System Statistics - Users: %d, Total Messes: %d, Active Messes: %d, Super Admins: %d",
                totalUsers, totalMesses, activeMesses, totalSuperAdmins);
    }
}
