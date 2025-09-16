package com.example.messelor.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import com.example.messelor.repository.MessRepository;
import com.example.messelor.repository.UserRepository;
import com.example.messelor.entity.Mess;
import com.example.messelor.entity.User;
import com.example.messelor.service.MessService;
import com.example.messelor.dto.MessDto;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessServiceImpl implements MessService {
    private final MessRepository repo;
    private final UserRepository userRepo;

    public MessServiceImpl(MessRepository r, UserRepository u) {
        this.repo = r;
        this.userRepo = u;
    }

    @Override
    public Mess createFromDto(MessDto d) {
        User m = userRepo.findById(d.getManagerId()).orElse(null);
        Mess e = Mess.builder().mess_name(d.getMessName()).messCode(d.getMessCode()).description(d.getDescription())
                .address(d.getAddress()).monthly_service_charge(d.getMonthlyServiceCharge()).max_members(d.getMaxMembers())
                .manager(m).created_at(LocalDateTime.now()).updated_at(LocalDateTime.now()).is_active(d.getIsActive())
                .build();
        return repo.save(e);
    }

    @Override
    public Mess updateFromDto(Integer id, MessDto d) {
        return repo.findById(id).map(e -> {
            e.setMess_name(d.getMessName());
            e.setDescription(d.getDescription());
            e.setAddress(d.getAddress());
            e.setMonthly_service_charge(d.getMonthlyServiceCharge());
            e.setMax_members(d.getMaxMembers());
            e.setUpdated_at(LocalDateTime.now());
            e.setIs_active(d.getIsActive());
            if (d.getManagerId() != null)
                userRepo.findById(d.getManagerId()).ifPresent(e::setManager);
            return repo.save(e);
        }).orElseThrow(() -> new RuntimeException("Mess not found"));
    }

    @Override
    public Mess getById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @Override
    public List<Mess> getAll(int page, int size) {
        return repo.findAll(PageRequest.of(page, size)).getContent();
    }

    @Override
    public void delete(Integer id) {
        repo.deleteById(id);
    }
}
