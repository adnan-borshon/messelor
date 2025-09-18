package com.example.messelor.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import com.example.messelor.service.UserService;
import com.example.messelor.repository.UserRepository;
import com.example.messelor.entity.User;
import java.util.List;
@Service
public class UserServiceImpl implements UserService{
 private final UserRepository repo;
 public UserServiceImpl(UserRepository r){this.repo=r;}
 @Override public User create(User u){return repo.save(u);}
 @Override public User update(Integer id,User u){return repo.findById(id).map(ex->{ex.setUsername(u.getUsername());ex.setEmail(u.getEmail());ex.setPassword(u.getPassword());return repo.save(ex);} ).orElseThrow(()->new RuntimeException("User not found"));}
 @Override public User getById(Integer id){return repo.findById(id).orElseThrow(()->new RuntimeException("User not found"));}
 @Override public List<User> getAll(int page,int size){return repo.findAll(PageRequest.of(page,size)).getContent();}
 @Override public void delete(Integer id){repo.deleteById(id);}
}

