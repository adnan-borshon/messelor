package com.example.messelor.service;


import com.example.messelor.entity.Mess;
import com.example.messelor.dto.MessDto;
import java.util.List;
public interface MessService{
 Mess createFromDto(MessDto dto);
 Mess updateFromDto(Integer id,MessDto dto);
 Mess getById(Integer id);
 List<Mess> getAll(int page,int size);
 void delete(Integer id);
}

