package com.example.messelor.service;


import com.example.messelor.entity.MealLog;
import com.example.messelor.repository.MealLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MealLogService {

    @Autowired
    private MealLogRepository mealLogRepository;

    public List<MealLog> getAllMealLogs() {
        return mealLogRepository.findAll();
    }

    public Optional<MealLog> getMealLogById(Integer id) {
        return mealLogRepository.findById(id);
    }

    public MealLog addMealLog(MealLog mealLog) {
        return mealLogRepository.save(mealLog);
    }

    public MealLog updateMealLog(Integer id, MealLog mealLog) {
        if (mealLogRepository.existsById(id)) {
            mealLog.setMeal_log_id(id);
            return mealLogRepository.save(mealLog);
        }
        return null;
    }

    public void deleteMealLog(Integer id) {
        mealLogRepository.deleteById(id);
    }
}
