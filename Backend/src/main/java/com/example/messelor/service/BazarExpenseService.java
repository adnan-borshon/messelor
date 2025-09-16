package com.example.messelor.service;


import com.example.messelor.entity.BazarExpense;
import com.example.messelor.repository.BazarExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BazarExpenseService {

    @Autowired
    private BazarExpenseRepository bazarExpenseRepository;

    public List<BazarExpense> getAllExpenses() {
        return bazarExpenseRepository.findAll();
    }

    public Optional<BazarExpense> getExpenseById(int id) {
        return bazarExpenseRepository.findById(id);
    }

    public BazarExpense addExpense(BazarExpense expense) {
        return bazarExpenseRepository.save(expense);
    }

    public BazarExpense updateExpense(int id, BazarExpense expense) {
        if (bazarExpenseRepository.existsById(id)) {
            expense.setExpense_id(id);
            return bazarExpenseRepository.save(expense);
        }
        return null;
    }

    public void deleteExpense(int id) {
        bazarExpenseRepository.deleteById(id);
    }
}
