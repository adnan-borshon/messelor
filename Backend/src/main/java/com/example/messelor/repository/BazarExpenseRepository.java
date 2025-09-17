package com.example.messelor.repository;

import com.example.messelor.entity.BazarExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BazarExpenseRepository extends JpaRepository<BazarExpense, Integer> {
    
    // Find expenses by mess
    List<BazarExpense> findByMessMessId(Integer mess_id);
    
    // Find expenses by mess and date
    List<BazarExpense> findByMessMessIdAndExpenseDate(Integer mess_id, LocalDate expense_date);
    
    // Find expenses by mess and date range
    List<BazarExpense> findByMessMessIdAndExpenseDateBetween(Integer mess_id, LocalDate start_date, LocalDate end_date);
    
    // Find expenses by category
    List<BazarExpense> findByCategoryCategoryId(Integer category_id);
    
    // Find expenses by vendor
    List<BazarExpense> findByVendorVendorId(Integer vendor_id);
    
    // Find expenses by entered by user
    List<BazarExpense> findByEnteredByUserId(Integer user_id);
    
    // Find expenses by payment method
    List<BazarExpense> findByPaymentMethod(String payment_method);
    
    // Get total expense amount by mess and month
    @Query("SELECT SUM(be.totalAmount) FROM BazarExpense be WHERE be.mess.mess_id = :mess_id AND " +
           "YEAR(be.expense_date) = :year AND MONTH(be.expense_date) = :month")
    BigDecimal getTotalExpenseByMessAndMonth(@Param("mess_id") Integer mess_id, @Param("year") Integer year, @Param("month") Integer month);
    
    // Get total expense amount by mess and date range
    @Query("SELECT SUM(be.totalAmount) FROM BazarExpense be WHERE be.mess.mess_id = :mess_id AND " +
           "be.expense_date BETWEEN :start_date AND :end_date")
    BigDecimal getTotalExpenseByMessAndDateRange(@Param("mess_id") Integer mess_id, 
                                               @Param("start_date") LocalDate start_date, 
                                               @Param("end_date") LocalDate end_date);
    
    // Get expense summary by category for a mess and month
    @Query("SELECT ec.categoryName, SUM(be.totalAmount) FROM BazarExpense be JOIN be.category ec " +
           "WHERE be.mess.mess_id = :mess_id AND YEAR(be.expense_date) = :year AND MONTH(be.expense_date) = :month " +
           "GROUP BY ec.category_id, ec.categoryName")
    List<Object[]> getExpenseSummaryByCategoryAndMonth(@Param("mess_id") Integer mess_id, 
                                                      @Param("year") Integer year, 
                                                      @Param("month") Integer month);
    
    // Get expense summary by vendor for a mess and date range
    @Query("SELECT v.vendorName, SUM(be.totalAmount) FROM BazarExpense be LEFT JOIN be.vendor v " +
           "WHERE be.mess.mess_id = :mess_id AND be.expense_date BETWEEN :start_date AND :end_date " +
           "GROUP BY v.vendor_id, v.vendorName")
    List<Object[]> getExpenseSummaryByVendorAndDateRange(@Param("mess_id") Integer mess_id, 
                                                        @Param("start_date") LocalDate start_date, 
                                                        @Param("end_date") LocalDate end_date);
    
    // Find high-value expenses (above threshold)
    @Query("SELECT be FROM BazarExpense be WHERE be.totalAmount > :threshold ORDER BY be.totalAmount DESC")
    List<BazarExpense> findHighValueExpenses(@Param("threshold") BigDecimal threshold);
    
    // Get daily expense summary for a mess and date range
    @Query("SELECT be.expense_date, SUM(be.totalAmount) FROM BazarExpense be " +
           "WHERE be.mess.mess_id = :mess_id AND be.expense_date BETWEEN :start_date AND :end_date " +
           "GROUP BY be.expense_date ORDER BY be.expense_date")
    List<Object[]> getDailyExpenseSummary(@Param("mess_id") Integer mess_id, 
                                         @Param("start_date") LocalDate start_date, 
                                         @Param("end_date") LocalDate end_date);
    
    // Count expenses by mess and month
    @Query("SELECT COUNT(be) FROM BazarExpense be WHERE be.mess.mess_id = :mess_id AND " +
           "YEAR(be.expense_date) = :year AND MONTH(be.expense_date) = :month")
    Integer countExpensesByMessAndMonth(@Param("mess_id") Integer mess_id, @Param("year") Integer year, @Param("month") Integer month);
    
    // Find recent expenses by mess
    @Query("SELECT be FROM BazarExpense be WHERE be.mess.mess_id = :mess_id ORDER BY be.enteredAt DESC")
    List<BazarExpense> findRecentExpensesByMess(@Param("mess_id") Integer mess_id);
    
    // Get average daily expense for a mess
    @Query("SELECT AVG(daily.totalAmount) FROM " +
           "(SELECT SUM(be.totalAmount) as totalAmount FROM BazarExpense be " +
           "WHERE be.mess.mess_id = :mess_id AND be.expense_date BETWEEN :start_date AND :end_date " +
           "GROUP BY be.expense_date) daily")
    BigDecimal getAverageDailyExpense(@Param("mess_id") Integer mess_id, 
                                     @Param("start_date") LocalDate start_date, 
                                     @Param("end_date") LocalDate end_date);
}