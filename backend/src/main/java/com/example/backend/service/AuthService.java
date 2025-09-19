package com.example.backend.service;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.request.SuperAdminRegisterRequest;
import com.example.backend.dto.response.JwtResponse;
import com.example.backend.entity.Role;
import com.example.backend.entity.SuperAdmin;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.SuperAdminRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final SuperAdminRepository superAdminRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public JwtResponse login(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsernameOrEmail(),
                        request.getPassword()
                )
        );

        String username = authentication.getName();

        // Check if user or super admin
        User user = userRepository.findByUsernameOrEmail(username, username).orElse(null);
        if (user != null) {
            List<String> roles = user.getRoles().stream()
                    .map(Role::getRoleName)
                    .collect(Collectors.toList());

            String token = jwtProvider.generateToken(username, "USER", roles);
            return new JwtResponse(token, user.getUsername(), "USER", user.getUserId(), roles);
        }

        SuperAdmin superAdmin = superAdminRepository.findByUsername(username).orElse(null);
        if (superAdmin != null) {
            List<String> roles = List.of("SUPER_ADMIN");
            String token = jwtProvider.generateToken(username, "SUPER_ADMIN", roles);
            return new JwtResponse(token, superAdmin.getUsername(), "SUPER_ADMIN", superAdmin.getSuperAdminId(), roles);
        }

        throw new RuntimeException("User not found after authentication");
    }

    public String registerUser(RegisterRequest request) {
        // Check if user exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        // Get default USER role
        Role userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Default USER role not found"));

        // Create new user with default role
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(new HashSet<>())
                .build();


        // 3. Save user first to generate ID
        User savedUser = userRepository.save(user);


        // 5. Assign role and save again
        savedUser.getRoles().add(userRole);
        userRepository.save(savedUser);
        return "User registered successfully!";
    }

    public String registerSuperAdmin(SuperAdminRegisterRequest request) {
        // Check if super admin exists
        if (superAdminRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Super admin username already exists!");
        }
        if (superAdminRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Super admin email already exists!");
        }

        // Create new super admin
        SuperAdmin superAdmin = SuperAdmin.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .build();

        superAdminRepository.save(superAdmin);
        return "Super admin registered successfully!";
    }
}