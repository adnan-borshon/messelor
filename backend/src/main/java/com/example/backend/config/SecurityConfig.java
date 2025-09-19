package com.example.backend.config;


import com.example.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/health/**").permitAll()
                        // Role management - SUPER_ADMIN and MESS_ADMIN
                        .requestMatchers(HttpMethod.GET, "/api/roles").hasAnyAuthority("SUPER_ADMIN", "MESS_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/roles/assignable").hasAnyAuthority("SUPER_ADMIN", "MESS_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/roles").hasAuthority("SUPER_ADMIN")

                        // User role management - SUPER_ADMIN and MESS_ADMIN
                        .requestMatchers(HttpMethod.POST, "/api/users/*/roles/*").hasAnyAuthority("SUPER_ADMIN", "MESS_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/users/*/roles/*").hasAnyAuthority("SUPER_ADMIN", "MESS_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/users/mess/*").hasAnyAuthority("SUPER_ADMIN", "MESS_ADMIN")

                        // Super admin endpoints
                        .requestMatchers("/api/superadmin/**").hasAuthority("SUPER_ADMIN")

                        // Mess management
                        .requestMatchers(HttpMethod.POST, "/api/mess").hasAnyAuthority("USER", "MESS_MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/mess/**").hasAnyAuthority("MESS_MANAGER", "MESS_ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/mess/**").hasAnyAuthority("MESS_MANAGER", "SUPER_ADMIN")
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Frontend origin
        configuration.addAllowedMethod("*"); // GET, POST, etc.
        configuration.addAllowedHeader("*"); // Allow all headers
        configuration.setAllowCredentials(true); // Allow cookies/auth headers

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public HttpFirewall defaultFirewall() {
        return new DefaultHttpFirewall();
    }
}