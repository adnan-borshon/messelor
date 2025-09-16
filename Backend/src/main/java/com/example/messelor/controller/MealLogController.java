package com.example.messelor.controller;

import org.springframework.web.bind.annotation.*;
import com.example.messelor.entity.MealLog;
import com.example.messelor.service.MealLogService;
import java.util.List;

@RestController
@RequestMapping("/api/meal-logs")
@CrossOrigin(origins = "http://localhost:5173")
public class MealLogController {
    private final MealLogService svc;

    public MealLogController(MealLogService s) {
        this.svc = s;
    }

    @GetMapping
    public List<MealLog> list(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "50") int size) {
        return svc.getAllMealLogs();
    }

    @GetMapping("/{id}")
    public MealLog get(@PathVariable Integer id) {
        return svc.getMealLogById(id).orElse(null);
    }

    @PostMapping
    public MealLog create(@RequestBody MealLog m) {
        return svc.addMealLog(m);
    }

    @PutMapping("/{id}")
    public MealLog update(@PathVariable Integer id, @RequestBody MealLog m) {
        return svc.updateMealLog(id, m);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        svc.deleteMealLog(id);
    }
}
