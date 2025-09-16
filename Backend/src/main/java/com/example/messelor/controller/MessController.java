package com.example.messelor.controller;

import org.springframework.web.bind.annotation.*;
import com.example.messelor.service.MessService;
import com.example.messelor.entity.Mess;
import com.example.messelor.dto.MessDto;
import java.util.List;
@RestController
@RequestMapping("/api/messes")
@CrossOrigin(origins = "http://localhost:5173")
public class MessController{
 private final MessService svc;
 public MessController(MessService s){this.svc=s;}
 @GetMapping public List<Mess> list(@RequestParam(defaultValue="0")int page,@RequestParam(defaultValue="20")int size){return svc.getAll(page,size);}
 @GetMapping("/{id}") public Mess get(@PathVariable Integer id){return svc.getById(id);}
 @PostMapping public Mess create(@RequestBody MessDto dto){return svc.createFromDto(dto);}
 @PutMapping("/{id}") public Mess update(@PathVariable Integer id,@RequestBody MessDto dto){return svc.updateFromDto(id,dto);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Integer id){svc.delete(id);}
}
