package com.example.messelor.repository;

import com.example.messelor.entity.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealLogRepository extends JpaRepository<MealLog, Integer> {
    
    // Find meal logs by user and date
    List<MealLog> findByUserUserIdAndMealDate(Integer user_id, LocalDate meal_date);
    
    // Find meal logs by mess and date
    List<MealLog> findByMessMessIdAndMealDate(Integer mess_id, LocalDate meal_date);
    
    // Find meal logs by user, mess and date
    List<MealLog> findByUserUserIdAndMessMessIdAndMealDate(Integer user_id, Integer mess_id, LocalDate meal_date);
    
    // Find specific meal log by user, mess, meal type and date
    Optional<MealLog> findByUserUserIdAndMessMessIdAndMealTypeMealTypeIdAndMealDate(
        Integer user_id, Integer mess_id, Integer meal_type_id, LocalDate meal_date);
    
    // Find meal logs by date range
    List<MealLog> findByMealDateBetween(LocalDate start_date, LocalDate end_date);
    
    // Find meal logs by user and date range
    List<MealLog> findByUserUserIdAndMealDateBetween(Integer user_id, LocalDate start_date, LocalDate end_date);
    
    // Find meal logs by mess and date range
    List<MealLog> findByMessMessIdAndMealDateBetween(Integer mess_id, LocalDate start_date, LocalDate end_date);
    
    // Count total meals by user in a month
    @Query("SELECT COUNT(ml) FROM MealLog ml WHERE ml.user.user_id = :user_id AND " +
           "YEAR(ml.meal_date) = :year AND MONTH(ml.meal_date) = :month")
    Integer countMealsByUserAndMonth(@Param("user_id") Integer user_id, @Param("year") Integer year, @Param("month") Integer month);
    
    // Count total meals by mess in a month
    @Query("SELECT COUNT(ml) FROM MealLog ml WHERE ml.mess.mess_id = :mess_id AND " +
           "YEAR(ml.meal_date) = :year AND MONTH(ml.meal_date) = :month")
    Integer countMealsByMessAndMonth(@Param("mess_id") Integer mess_id, @Param("year") Integer year, @Param("month") Integer month);
    
    // Count meals by meal type for a user in a month
    @Query("SELECT COUNT(ml) FROM MealLog ml WHERE ml.user.user_id = :user_id AND ml.mealType.meal_type_id = :meal_type_id AND " +
           "YEAR(ml.meal_date) = :year AND MONTH(ml.meal_date) = :month")
    Integer countMealsByUserMealTypeAndMonth(@Param("user_id") Integer user_id, @Param("meal_type_id") Integer meal_type_id, 
                                         @Param("year") Integer year, @Param("month") Integer month);
    
    // Find recent meal logs by user (last N days)
    @Query("SELECT ml FROM MealLog ml WHERE ml.user.user_id = :user_id AND ml.meal_date >= :fromDate ORDER BY ml.meal_date DESC, ml.loggedAt DESC")
    List<MealLog> findRecentMealLogsByUser(@Param("user_id") Integer user_id, @Param("fromDate") LocalDate fromDate);
    
    // Find users who haven't logged meals for a specific date and mess
    @Query("SELECT DISTINCT u FROM User u JOIN u.messMembers mm WHERE mm.mess.mess_id = :mess_id AND mm.isActive = true AND " +
           "u.user_id NOT IN (SELECT ml.user.user_id FROM MealLog ml WHERE ml.mess.mess_id = :mess_id AND ml.meal_date = :date)")
    List<com.example.messelor.entity.User> findUsersWithoutMealLogsForDate(@Param("mess_id") Integer mess_id, @Param("date") LocalDate date);
    
    // Get meal summary by mess and date range
    @Query("SELECT ml.mealType.mealName, COUNT(ml) FROM MealLog ml WHERE ml.mess.mess_id = :mess_id AND " +
           "ml.meal_date BETWEEN :start_date AND :end_date GROUP BY ml.mealType.meal_type_id, ml.mealType.mealName")
    List<Object[]> getMealSummaryByMessAndDateRange(@Param("mess_id") Integer mess_id, 
                                                   @Param("start_date") LocalDate start_date, 
                                                   @Param("end_date") LocalDate end_date);
    
    // Check if user has logged any meal for a specific date
    @Query("SELECT COUNT(ml) > 0 FROM MealLog ml WHERE ml.user.user_id = :user_id AND ml.meal_date = :date")
    Boolean hasUserLoggedMealForDate(@Param("user_id") Integer user_id, @Param("date") LocalDate date);
    
    // Find meal logs with notes
    List<MealLog> findByNotesIsNotNullOrderByLoggedAtDesc();
}