package com.example.messelor.repository;

import com.example.messelor.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // Find by username
    Optional<User> findByUsername(String username);
    
    // Find by email
    Optional<User> findByEmail(String email);
    
    // Find by username or email
    Optional<User> findByUsernameOrEmail(String username, String email);
    
    // Check if username exists
    Boolean existsByUsername(String username);
    
    // Check if email exists
    Boolean existsByEmail(String email);
    
    // Find users by partial username or email (search functionality)
    @Query("SELECT u FROM User u WHERE u.username LIKE %:searchTerm% OR u.email LIKE %:searchTerm%")
    List<User> findByUsernameOrEmailContaining(@Param("searchTerm") String searchTerm);
    
    // Find all users who are members of a specific mess
    @Query("SELECT DISTINCT u FROM User u JOIN u.messMembers mm WHERE mm.mess.mess_id = :mess_id AND mm.isActive = true")
    List<User> findActiveUsersByMessId(@Param("mess_id") Integer mess_id);
    
    // Find all users who are admins of any mess
    @Query("SELECT DISTINCT u FROM User u JOIN u.messAdmins ma")
    List<User> findAllAdmins();
    
    // Find all users who are managers of any mess
    @Query("SELECT DISTINCT u FROM User u JOIN u.managedMesses m WHERE m.isActive = true")
    List<User> findAllManagers();
    
    // Find users without any mess membership
    @Query("SELECT u FROM User u WHERE u.messMembers IS EMPTY")
    List<User> findUsersWithoutMess();
    
    // Count total active users
    @Query("SELECT COUNT(u) FROM User u")
    Integer countTotalUsers();
}