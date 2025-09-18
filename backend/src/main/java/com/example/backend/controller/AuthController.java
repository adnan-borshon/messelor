package com.example.backend.controller;

import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.payload.JwtResponse;
import com.example.backend.payload.LoginRequest;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.usernameOrEmail(), request.password())
        );

        String token = jwtProvider.generateToken(authentication);
        User user = userRepository.findByUsername(request.usernameOrEmail())
                .orElseThrow();

        List<String> roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .toList();

        return new JwtResponse(token, user.getUsername(), roles);
    }

    @PostMapping("/register")
    public String register(@RequestBody LoginRequest request) {
        if (userRepository.findByUsername(request.usernameOrEmail()).isPresent()
                || userRepository.findByEmail(request.usernameOrEmail()).isPresent()) {
            return "User already exists!";
        }

        User user = User.builder()
                .username(request.usernameOrEmail())
                .email(request.usernameOrEmail())
                .password(passwordEncoder.encode(request.password()))
                .enabled(true)
                .build();

        // Assign MEMBER role by default
        Role role = roleRepository.findByRoleName("MEMBER").orElseThrow();
        user.getRoles().add(role);

        userRepository.save(user);
        return "User registered successfully!";
    }
}
