package com.example.messelor.service;

import com.example.messelor.entity.User;
import java.util.List;
public interface UserService{
 User create(User u);
 User update(Integer id,User u);
 User getById(Integer id);
 List<User> getAll(int page,int size);
 void delete(Integer id);
}

