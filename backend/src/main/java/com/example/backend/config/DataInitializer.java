package com.example.backend.config;

import com.example.backend.entity.Role;
import com.example.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        createRoleIfNotFound("USER", "Default user role");
        createRoleIfNotFound("MESS_ADMIN", "Mess admin role");
        createRoleIfNotFound("MANAGER", "Mess manager role");
        createRoleIfNotFound("SUPER_ADMIN", "Super admin role");
    }

    private void createRoleIfNotFound(String roleName, String description) {
        roleRepository.findByRoleName(roleName)
                .orElseGet(() -> roleRepository.save(Role.builder()
                        .roleName(roleName)
                        .description(description)
                        .build()));
    }
}
