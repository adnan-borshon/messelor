package com.example.messelor.repository;



import com.example.messelor.entity.BazarExpense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BazarExpenseRepository extends JpaRepository<BazarExpense, Integer> {
}

