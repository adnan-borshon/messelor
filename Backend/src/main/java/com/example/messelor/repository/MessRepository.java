package com.example.messelor.repository;

import com.example.messelor.entity.Mess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessRepository extends JpaRepository<Mess, Integer> {
    
    // Find by mess code
    Optional<Mess> findByMessCode(String mess_code);
    
    // Find by mess name
    List<Mess> findByMessNameContainingIgnoreCase(String mess_name);
    
    // Check if mess code exists
    Boolean existsByMessCode(String mess_code);
    
    // Find all active messes
    List<Mess> findByIsActiveTrue();
    
    // Find all inactive messes
    List<Mess> findByIsActiveFalse();
    
    // Find messes by manager
    List<Mess> findByManagerUserId(Integer manager_id);
    
    // Find messes managed by a specific user
    @Query("SELECT m FROM Mess m WHERE m.manager.user_id = :manager_id AND m.is_active = true")
    List<Mess> findActiveMessesByManagerId(@Param("manager_id") Integer manager_id);
    
    // Find messes where user is admin
    @Query("SELECT DISTINCT m FROM Mess m JOIN m.messAdmins ma WHERE ma.admin.user_id = :adminId")
    List<Mess> findMessesByAdminId(@Param("adminId") Integer adminId);
    
    // Find messes where user is member
    @Query("SELECT DISTINCT m FROM Mess m JOIN m.messMembers mm WHERE mm.user.user_id = :user_id AND mm.is_active = true")
    List<Mess> findMessesByMemberId(@Param("user_id") Integer user_id);
    
    // Count total active members in a mess
    @Query("SELECT COUNT(mm) FROM MessMember mm WHERE mm.mess.mess_id = :mess_id AND mm.is_active = true")
    Integer countActiveMembersByMessId(@Param("mess_id") Integer mess_id);
    
    // Find messes with available slots (current members < max members)
    @Query("SELECT m FROM Mess m WHERE m.is_active = true AND " +
           "(SELECT COUNT(mm) FROM MessMember mm WHERE mm.mess.mess_id = m.mess_id AND mm.is_active = true) < m.maxMembers")
    List<Mess> findMessesWithAvailableSlots();
    
    // Find messes by service charge range
    @Query("SELECT m FROM Mess m WHERE m.monthlyServiceCharge BETWEEN :min_charge AND :max_charge AND m.is_active = true")
    List<Mess> findByServiceChargeRange(@Param("min_charge") Double min_charge, @Param("max_charge") Double max_charge);
    
    // Search messes by name or code
    @Query("SELECT m FROM Mess m WHERE (m.mess_name LIKE %:searchTerm% OR m.mess_code LIKE %:searchTerm%) AND m.is_active = true")
    List<Mess> searchActiveMessesByNameOrCode(@Param("searchTerm") String searchTerm);
    
    // Count total active messes
    @Query("SELECT COUNT(m) FROM Mess m WHERE m.is_active = true")
    Integer countActiveMesses();
}