package com.example.messelor.controller;
import org.springframework.web.bind.annotation.*;
import com.example.messelor.service.UserService;
import com.example.messelor.entity.User;
import java.util.List;

@RestController
@RequestMapping("/api/users")

@CrossOrigin(origins = "http://localhost:5173")

public class UserController {
    private final UserService svc;

    public UserController(UserService s) {
        this.svc = s;
    }

    @GetMapping
    public List<User> list(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return svc.getAll(page, size);
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Integer id) {
        return svc.getById(id);
    }

    @PostMapping
    public User create(@RequestBody User u) {
        return svc.create(u);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Integer id, @RequestBody User u) {
        return svc.update(id, u);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        svc.delete(id);
    }
}
