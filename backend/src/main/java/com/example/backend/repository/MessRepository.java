
package com.example.backend.repository;

import com.example.backend.entity.Mess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessRepository extends JpaRepository<Mess, Integer> {
    Optional<Mess> findByMessCode(String messCode);
    List<Mess> findByIsActiveTrue();
    List<Mess> findByManager_UserId(Integer managerId);
}