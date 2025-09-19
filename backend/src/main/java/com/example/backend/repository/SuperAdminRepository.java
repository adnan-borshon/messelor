package com.example.backend.repository;


import com.example.backend.entity.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuperAdminRepository extends JpaRepository<SuperAdmin, Integer> {
    Optional<SuperAdmin> findByUsername(String username);
    Optional<SuperAdmin> findByEmail(String email);
}