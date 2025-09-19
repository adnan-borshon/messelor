package com.example.backend.service;

import com.example.backend.dto.request.UserProfileRequest;
import com.example.backend.dto.response.UserProfileResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.MessMember;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.entity.UserProfile;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final RoleRepository roleRepository;
    private final MessMemberRepository messMemberRepository;
    private final MessAdminRepository messAdminRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return convertToUserResponse(user);
    }

    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return convertToUserResponse(user);
    }

    @Transactional
    public UserProfileResponse createOrUpdateProfile(Integer userId, UserProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        UserProfile profile = userProfileRepository.findByUser_UserId(userId)
                .orElse(UserProfile.builder()
                        .user(user)
                        .createdAt(LocalDateTime.now())
                        .build());

        // Update profile fields
        profile.setName(request.getName());
        profile.setPhone(request.getPhone());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());
        profile.setHeight(request.getHeight());
        profile.setWeight(request.getWeight());
        profile.setActivityLevel(request.getActivityLevel());
        profile.setDietaryPreferences(request.getDietaryPreferences());
        profile.setAllergies(request.getAllergies());
        profile.setUpdatedAt(LocalDateTime.now());

        UserProfile savedProfile = userProfileRepository.save(profile);
        return convertToUserProfileResponse(savedProfile);
    }

    public UserProfileResponse getUserProfile(Integer userId) {
        UserProfile profile = userProfileRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found for user id: " + userId));
        return convertToUserProfileResponse(profile);
    }

    @Transactional
    public String deleteUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        userRepository.delete(user);
        return "User deleted successfully";
    }




    /**
     * Assign role to user with permission checks for MESS_ADMIN
     */
    @Transactional
    public String assignRoleToUser(Integer userId, String roleName, UserResponse currentUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        // Permission checks
        if (currentUser.getRoles().contains("SUPER_ADMIN")) {
            // SUPER_ADMIN can assign any role to anyone
            user.getRoles().add(role);
            userRepository.save(user);
            return "Role '" + roleName + "' assigned successfully to user: " + user.getUsername();
        }
        else if (currentUser.getRoles().contains("MESS_ADMIN")) {
            // MESS_ADMIN can only assign limited roles and only to users in their mess
            List<String> allowedRoles = Arrays.asList("USER", "MESS_MEMBER");

            if (!allowedRoles.contains(roleName)) {
                throw new RuntimeException("MESS_ADMIN can only assign roles: " + String.join(", ", allowedRoles));
            }

            // Check if the target user is in the same mess as the MESS_ADMIN
            if (!isUserInSameMessAsAdmin(currentUser.getUserId(), userId)) {
                throw new RuntimeException("MESS_ADMIN can only assign roles to users in their own mess");
            }

            user.getRoles().add(role);
            userRepository.save(user);
            return "Role '" + roleName + "' assigned successfully to user: " + user.getUsername();
        }
        else {
            throw new RuntimeException("Insufficient permissions to assign roles");
        }
    }

    /**
     * Remove role from user with permission checks for MESS_ADMIN
     */
    @Transactional
    public String removeRoleFromUser(Integer userId, String roleName, UserResponse currentUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        // Permission checks
        if (currentUser.getRoles().contains("SUPER_ADMIN")) {
            // SUPER_ADMIN can remove any role from anyone
            user.getRoles().remove(role);
            userRepository.save(user);
            return "Role '" + roleName + "' removed successfully from user: " + user.getUsername();
        }
        else if (currentUser.getRoles().contains("MESS_ADMIN")) {
            // MESS_ADMIN can only remove limited roles and only from users in their mess
            List<String> allowedRoles = Arrays.asList("USER", "MESS_MEMBER");

            if (!allowedRoles.contains(roleName)) {
                throw new RuntimeException("MESS_ADMIN can only remove roles: " + String.join(", ", allowedRoles));
            }

            // Check if the target user is in the same mess as the MESS_ADMIN
            if (!isUserInSameMessAsAdmin(currentUser.getUserId(), userId)) {
                throw new RuntimeException("MESS_ADMIN can only remove roles from users in their own mess");
            }

            user.getRoles().remove(role);
            userRepository.save(user);
            return "Role '" + roleName + "' removed successfully from user: " + user.getUsername();
        }
        else {
            throw new RuntimeException("Insufficient permissions to remove roles");
        }
    }

    /**
     * Get users in a specific mess - with permission checks
     */
    public List<UserResponse> getUsersInMess(Integer messId, UserResponse currentUser) {
        // Permission checks
        if (currentUser.getRoles().contains("SUPER_ADMIN")) {
            // SUPER_ADMIN can see users in any mess
            return getUsersInMessInternal(messId);
        }
        else if (currentUser.getRoles().contains("MESS_ADMIN")) {
            // MESS_ADMIN can only see users in their own mess
            if (!isMessAdminOfMess(currentUser.getUserId(), messId)) {
                throw new RuntimeException("MESS_ADMIN can only view users in their own mess");
            }
            return getUsersInMessInternal(messId);
        }
        else {
            throw new RuntimeException("Insufficient permissions to view mess users");
        }
    }

    /**
     * Internal method to get users in mess
     */
    private List<UserResponse> getUsersInMessInternal(Integer messId) {
        List<MessMember> messMembers = messMemberRepository.findByMess_MessIdAndIsActiveTrue(messId);
        return messMembers.stream()
                .map(member -> convertToUserResponse(member.getUser()))
                .collect(Collectors.toList());
    }

    /**
     * Check if user is in the same mess as the admin
     */
    private boolean isUserInSameMessAsAdmin(Integer adminUserId, Integer targetUserId) {
        // Get messes where the admin is an admin
        List<Integer> adminMessIds = messAdminRepository.findByAdmin_UserId(adminUserId)
                .stream()
                .map(messAdmin -> messAdmin.getMess().getMessId())
                .collect(Collectors.toList());

        // Get messes where the target user is a member
        List<Integer> userMessIds = messMemberRepository.findByUser_UserIdAndIsActiveTrue(targetUserId)
                .stream()
                .map(messMember -> messMember.getMess().getMessId())
                .collect(Collectors.toList());

        // Check if there's any common mess
        return adminMessIds.stream().anyMatch(userMessIds::contains);
    }

    /**
     * Check if user is admin of specific mess
     */
    private boolean isMessAdminOfMess(Integer userId, Integer messId) {
        return messAdminRepository.findByMess_MessIdAndAdmin_UserId(messId, userId).isPresent();
    }

    // ... (existing methods remain the same)

    private UserResponse convertToUserResponse(User user) {
        UserProfileResponse profileResponse = null;
        if (user.getUserProfile() != null) {
            profileResponse = convertToUserProfileResponse(user.getUserProfile());
        }

        List<String> roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList());

        return UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(roles)
                .profile(profileResponse)
                .build();
    }

    private UserProfileResponse convertToUserProfileResponse(UserProfile profile) {
        return UserProfileResponse.builder()
                .userProfileId(profile.getUserProfileId())
                .name(profile.getName())
                .phone(profile.getPhone())
                .dateOfBirth(profile.getDateOfBirth())
                .gender(profile.getGender())
                .height(profile.getHeight())
                .weight(profile.getWeight())
                .activityLevel(profile.getActivityLevel())
                .dietaryPreferences(profile.getDietaryPreferences())
                .allergies(profile.getAllergies())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}