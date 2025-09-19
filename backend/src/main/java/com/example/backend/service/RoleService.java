package com.example.backend.service;

import com.example.backend.dto.response.RoleResponse;
import com.example.backend.entity.Role;
import com.example.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(this::convertToRoleResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get roles that can be assigned based on user permissions
     */
    public List<RoleResponse> getAssignableRoles(boolean isSuperAdmin) {
        if (isSuperAdmin) {
            // SUPER_ADMIN can assign any role
            return getAllRoles();
        } else {
            // MESS_ADMIN can only assign limited roles
            List<String> allowedRoles = Arrays.asList("USER", "MESS_MEMBER");
            return roleRepository.findAll().stream()
                    .filter(role -> allowedRoles.contains(role.getRoleName()))
                    .map(this::convertToRoleResponse)
                    .collect(Collectors.toList());
        }
    }

    public RoleResponse createRole(String roleName, String description) {
        if (roleRepository.findByRoleName(roleName).isPresent()) {
            throw new RuntimeException("Role already exists: " + roleName);
        }

        Role role = Role.builder()
                .roleName(roleName)
                .description(description)
                .build();

        Role savedRole = roleRepository.save(role);
        return convertToRoleResponse(savedRole);
    }

    private RoleResponse convertToRoleResponse(Role role) {
        return RoleResponse.builder()
                .roleId(role.getRoleId())
                .roleName(role.getRoleName())
                .description(role.getDescription())
                .build();
    }
}