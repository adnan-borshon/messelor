package com.example.backend.security;

import com.example.backend.entity.Role;
import com.example.backend.entity.SuperAdmin;
import com.example.backend.entity.User;
import com.example.backend.repository.SuperAdminRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SuperAdminRepository superAdminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Try to find in User table first
        User user = userRepository.findByUsernameOrEmail(username, username).orElse(null);
        if (user != null) {
            List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                    .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                    .collect(Collectors.toList());

            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .authorities(authorities)
                    .build();
        }

        // Try to find in SuperAdmin table
        SuperAdmin superAdmin = superAdminRepository.findByUsername(username).orElse(null);
        if (superAdmin != null && superAdmin.getIsActive()) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(superAdmin.getUsername())
                    .password(superAdmin.getPassword())
                    .authorities("SUPER_ADMIN")
                    .build();
        }

        throw new UsernameNotFoundException("User not found: " + username);
    }
}