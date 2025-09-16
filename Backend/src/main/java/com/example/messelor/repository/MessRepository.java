package com.example.messelor.repository;


import com.example.messelor.entity.Mess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessRepository extends JpaRepository<Mess, Integer> {
    Mess findByMessCode(String messCode);
}

