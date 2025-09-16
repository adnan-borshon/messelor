package com.example.messelor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.messelor.entity.User;
import java.util.Optional;
public interface UserRepository extends JpaRepository<User,Integer>{
 Optional<User> findByUsername(String username);
 Optional<User> findByEmail(String email);
}

