package com.example.messelor.controller;

import org.springframework.web.bind.annotation.*;
import com.example.messelor.entity.BazarExpense;
import com.example.messelor.service.BazarExpenseService;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class BazarExpenseController {
    private final BazarExpenseService svc;

    public BazarExpenseController(BazarExpenseService s) {
        this.svc = s;
    }

    @GetMapping
    public List<BazarExpense> list(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return svc.getAllExpenses();
    }

    @GetMapping("/{id}")
    public BazarExpense get(@PathVariable Integer id) {
        return svc.getExpenseById(id).orElse(null);
    }

    @PostMapping
    public BazarExpense create(@RequestBody BazarExpense e) {
        return svc.addExpense(e);
    }

    @PutMapping("/{id}")
    public BazarExpense update(@PathVariable Integer id, @RequestBody BazarExpense e) {
        return svc.updateExpense(id, e);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        svc.deleteExpense(id);
    }
}
