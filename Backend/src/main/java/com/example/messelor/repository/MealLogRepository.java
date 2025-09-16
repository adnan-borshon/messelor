package com.example.messelor.repository;


import com.example.messelor.entity.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealLogRepository extends JpaRepository<MealLog, Integer> {
}
