package com.example.backend.repository;



import com.example.backend.entity.MessMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessMemberRepository extends JpaRepository<MessMember, Integer> {
    List<MessMember> findByMess_MessIdAndIsActiveTrue(Integer messId);
    List<MessMember> findByUser_UserIdAndIsActiveTrue(Integer userId);
    Optional<MessMember> findByUser_UserIdAndMess_MessIdAndIsActiveTrue(Integer userId, Integer messId);
}