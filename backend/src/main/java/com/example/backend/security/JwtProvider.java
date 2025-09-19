package com.example.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Component
public class JwtProvider {

    private byte[] keyBytes;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    @PostConstruct
    public void init() {
        keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
    }

    // Updated to include roles in token
    public String generateToken(String username, String userType, List<String> roles) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("userType", userType)
                .claim("roles", String.join(",", roles)) // Add roles to token
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(Keys.hmacShaKeyFor(keyBytes))
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(keyBytes).build().parseClaimsJws(token);
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(keyBytes).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public String getUserTypeFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(keyBytes).build().parseClaimsJws(token).getBody();
        return claims.get("userType", String.class);
    }

    // New method to get roles from token
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(keyBytes).build().parseClaimsJws(token).getBody();
        String rolesString = claims.get("roles", String.class);
        return rolesString != null ? List.of(rolesString.split(",")) : List.of();
    }
}