package com.example.backend.service;

import com.example.backend.dto.request.CreateMessRequest;
import com.example.backend.dto.request.JoinMessRequest;
import com.example.backend.dto.response.MessMemberResponse;
import com.example.backend.dto.response.MessResponse;
import com.example.backend.entity.Mess;
import com.example.backend.entity.MessAdmin;
import com.example.backend.entity.MessMember;
import com.example.backend.entity.User;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessService {

    private final MessRepository messRepository;
    private final UserRepository userRepository;
    private final MessMemberRepository messMemberRepository;
    private final MessAdminRepository messAdminRepository;

    @Transactional
    public MessResponse createMess(Integer managerId, CreateMessRequest request) {
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found with id: " + managerId));

        // Check if mess code already exists
        if (messRepository.findByMessCode(request.getMessCode()).isPresent()) {
            throw new RuntimeException("Mess code already exists: " + request.getMessCode());
        }

        Mess mess = Mess.builder()
                .messName(request.getMessName())
                .messCode(request.getMessCode())
                .description(request.getDescription())
                .address(request.getAddress())
                .monthlyServiceCharge(request.getMonthlyServiceCharge())
                .maxMembers(request.getMaxMembers())
                .manager(manager)
                .isActive(true)
                .build();

        Mess savedMess = messRepository.save(mess);

        // Add manager as mess admin
        MessAdmin messAdmin = MessAdmin.builder()
                .mess(savedMess)
                .admin(manager)
                .build();
        messAdminRepository.save(messAdmin);

        // Add manager as mess member
        MessMember messManager = MessMember.builder()
                .mess(savedMess)
                .user(manager)
                .joinedDate(LocalDate.now())
                .isActive(true)
                .build();
        messMemberRepository.save(messManager);

        return convertToMessResponse(savedMess);
    }

    public List<MessResponse> getAllMesses() {
        return messRepository.findByIsActiveTrue().stream()
                .map(this::convertToMessResponse)
                .collect(Collectors.toList());
    }

    public MessResponse getMessById(Integer messId) {
        Mess mess = messRepository.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found with id: " + messId));
        return convertToMessResponse(mess);
    }

    public MessResponse getMessByCode(String messCode) {
        Mess mess = messRepository.findByMessCode(messCode)
                .orElseThrow(() -> new RuntimeException("Mess not found with code: " + messCode));
        return convertToMessResponse(mess);
    }

    public List<MessResponse> getMessesByManager(Integer managerId) {
        return messRepository.findByManager_UserId(managerId).stream()
                .map(this::convertToMessResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public String joinMess(Integer userId, JoinMessRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Mess mess = messRepository.findByMessCode(request.getMessCode())
                .orElseThrow(() -> new RuntimeException("Mess not found with code: " + request.getMessCode()));

        // Check if user is already a member
        if (messMemberRepository.findByUser_UserIdAndMess_MessIdAndIsActiveTrue(userId, mess.getMessId()).isPresent()) {
            throw new RuntimeException("User is already a member of this mess");
        }

        // Check if mess is at capacity
        long currentMembers = messMemberRepository.findByMess_MessIdAndIsActiveTrue(mess.getMessId()).size();
        if (currentMembers >= mess.getMaxMembers()) {
            throw new RuntimeException("Mess is at full capacity");
        }

        MessMember messMapping = MessMember.builder()
                .mess(mess)
                .user(user)
                .joinedDate(LocalDate.now())
                .isActive(true)
                .build();

        messMemberRepository.save(messMapping);
        return "Successfully joined the mess: " + mess.getMessName();
    }

    @Transactional
    public String leaveMess(Integer userId, Integer messId) {
        MessMember messMember = messMemberRepository.findByUser_UserIdAndMess_MessIdAndIsActiveTrue(userId, messId)
                .orElseThrow(() -> new RuntimeException("User is not a member of this mess"));

        messMember.setIsActive(false);
        messMember.setLeftDate(LocalDate.now());
        messMember.setUpdatedAt(LocalDateTime.now());

        messMemberRepository.save(messMember);
        return "Successfully left the mess";
    }

    public List<MessMemberResponse> getMessMembers(Integer messId) {
        List<MessMember> members = messMemberRepository.findByMess_MessIdAndIsActiveTrue(messId);
        return members.stream()
                .map(this::convertToMessMemberResponse)
                .collect(Collectors.toList());
    }

    public List<MessResponse> getUserMesses(Integer userId) {
        List<MessMember> userMemberships = messMemberRepository.findByUser_UserIdAndIsActiveTrue(userId);
        return userMemberships.stream()
                .map(membership -> convertToMessResponse(membership.getMess()))
                .collect(Collectors.toList());
    }

    @Transactional
    public String updateMess(Integer messId, CreateMessRequest request, Integer managerId) {
        Mess mess = messRepository.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found with id: " + messId));

        // Check if user is the manager
        if (!mess.getManager().getUserId().equals(managerId)) {
            throw new RuntimeException("Only mess manager can update mess details");
        }

        mess.setMessName(request.getMessName());
        mess.setDescription(request.getDescription());
        mess.setAddress(request.getAddress());
        mess.setMonthlyServiceCharge(request.getMonthlyServiceCharge());
        mess.setMaxMembers(request.getMaxMembers());
        mess.setUpdatedAt(LocalDateTime.now());

        messRepository.save(mess);
        return "Mess updated successfully";
    }

    @Transactional
    public String deleteMess(Integer messId, Integer managerId) {
        Mess mess = messRepository.findById(messId)
                .orElseThrow(() -> new RuntimeException("Mess not found with id: " + messId));

        // Check if user is the manager
        if (!mess.getManager().getUserId().equals(managerId)) {
            throw new RuntimeException("Only mess manager can delete the mess");
        }

        mess.setIsActive(false);
        mess.setUpdatedAt(LocalDateTime.now());

        messRepository.save(mess);
        return "Mess deleted successfully";
    }

    private MessResponse convertToMessResponse(Mess mess) {
        int currentMembers = messMemberRepository.findByMess_MessIdAndIsActiveTrue(mess.getMessId()).size();

        return MessResponse.builder()
                .messId(mess.getMessId())
                .messName(mess.getMessName())
                .messCode(mess.getMessCode())
                .description(mess.getDescription())
                .address(mess.getAddress())
                .monthlyServiceCharge(mess.getMonthlyServiceCharge())
                .maxMembers(mess.getMaxMembers())
                .currentMembers(currentMembers)
                .managerUsername(mess.getManager().getUsername())
                .createdAt(mess.getCreatedAt())
                .updatedAt(mess.getUpdatedAt())
                .isActive(mess.getIsActive())
                .build();
    }

    private MessMemberResponse convertToMessMemberResponse(MessMember member) {
        String name = null;
        if (member.getUser().getUserProfile() != null) {
            name = member.getUser().getUserProfile().getName();
        }

        return MessMemberResponse.builder()
                .messMemberId(member.getMessMemberId())
                .username(member.getUser().getUsername())
                .email(member.getUser().getEmail())
                .name(name)
                .joinedDate(member.getJoinedDate())
                .leftDate(member.getLeftDate())
                .isActive(member.getIsActive())
                .createdAt(member.getCreatedAt())
                .build();
    }
}
