package com.example.backend.repository;

import com.example.backend.entity.MessAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessAdminRepository extends JpaRepository<MessAdmin, Integer> {
    List<MessAdmin> findByMess_MessId(Integer messId);
    List<MessAdmin> findByAdmin_UserId(Integer adminId);
    Optional<MessAdmin> findByMess_MessIdAndAdmin_UserId(Integer messId, Integer adminId);
}