package com.example.messelor.repository;

import com.example.messelor.entity.MonthlyBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface MonthlyBillRepository extends JpaRepository<MonthlyBill, Integer> {
    
    // Find bill by user, mess, month and year
    Optional<MonthlyBill> findByUserUserIdAndMessMessIdAndBillingMonthAndBillingYear(
        Integer user_id, Integer mess_id, Integer billing_month, Integer billing_year);
    
    // Find bills by user
    List<MonthlyBill> findByUserUserIdOrderByBillingYearDescBillingMonthDesc(Integer user_id);
    
    // Find bills by mess
    List<MonthlyBill> findByMessMessIdOrderByBillingYearDescBillingMonthDesc(Integer mess_id);
    
    // Find bills by mess and month/year
    List<MonthlyBill> findByMessMessIdAndBillingMonthAndBillingYear(Integer mess_id, Integer billing_month, Integer billing_year);
    
    // Find bills by status
    List<MonthlyBill> findByBillStatus(String bill_status);
    
    // Find pending bills for a user
    List<MonthlyBill> findByUserUserIdAndBillStatusIn(Integer user_id, List<String> statuses);
    
    // Find overdue bills
    List<MonthlyBill> findByBillStatusAndDueDateBefore(String bill_status, java.time.LocalDate currentDate);
    
    // Find unpaid bills (GENERATED, SENT, PARTIALLY_PAID)
    @Query("SELECT mb FROM MonthlyBill mb WHERE mb.bill_status IN ('GENERATED', 'SENT', 'PARTIALLY_PAID')")
    List<MonthlyBill> findUnpaidBills();
    
    // Find bills with outstanding balance
    @Query("SELECT mb FROM MonthlyBill mb WHERE mb.balance > 0")
    List<MonthlyBill> findBillsWithOutstandingBalance();
    
    // Get total outstanding amount by user
    @Query("SELECT SUM(mb.balance) FROM MonthlyBill mb WHERE mb.user.user_id = :user_id AND mb.balance > 0")
    BigDecimal getTotalOutstandingBalanceByUser(@Param("user_id") Integer user_id);
    
    // Get total outstanding amount by mess
    @Query("SELECT SUM(mb.balance) FROM MonthlyBill mb WHERE mb.mess.mess_id = :mess_id AND mb.balance > 0")
    BigDecimal getTotalOutstandingBalanceByMess(@Param("mess_id") Integer mess_id);
    
    // Get total revenue by mess and month
    @Query("SELECT SUM(mb.totalAmount) FROM MonthlyBill mb WHERE mb.mess.mess_id = :mess_id AND " +
           "mb.billing_month = :month AND mb.billing_year = :year")
    BigDecimal getTotalRevenueByMessAndMonth(@Param("mess_id") Integer mess_id, @Param("month") Integer month, @Param("year") Integer year);
    
    // Get total collected amount by mess and month
    @Query("SELECT SUM(mb.amountPaid) FROM MonthlyBill mb WHERE mb.mess.mess_id = :mess_id AND " +
           "mb.billing_month = :month AND mb.billing_year = :year")
    BigDecimal getTotalCollectedAmountByMessAndMonth(@Param("mess_id") Integer mess_id, @Param("month") Integer month, @Param("year") Integer year);
    
    // Count bills by status and mess
    @Query("SELECT COUNT(mb) FROM MonthlyBill mb WHERE mb.mess.mess_id = :mess_id AND mb.bill_status = :status")
    Integer countBillsByMessAndStatus(@Param("mess_id") Integer mess_id, @Param("status") String status);
    
    // Find user's bill history
    @Query("SELECT mb FROM MonthlyBill mb WHERE mb.user.user_id = :user_id ORDER BY mb.billing_year DESC, mb.billing_month DESC")
    List<MonthlyBill> findUserBillHistory(@Param("user_id") Integer user_id);
    
    // Find mess bill summary for a specific month/year
    @Query("SELECT mb.user.username, mb.totalMeals, mb.totalAmount, mb.amountPaid, mb.balance, mb.bill_status " +
           "FROM MonthlyBill mb WHERE mb.mess.mess_id = :mess_id AND mb.billing_month = :month AND mb.billing_year = :year")
    List<Object[]> getMessBillSummary(@Param("mess_id") Integer mess_id, @Param("month") Integer month, @Param("year") Integer year);
    
    // Get payment collection rate for a mess
    @Query("SELECT (SUM(mb.amountPaid) * 100.0 / SUM(mb.totalAmount)) FROM MonthlyBill mb " +
           "WHERE mb.mess.mess_id = :mess_id AND mb.billing_month = :month AND mb.billing_year = :year")
    Double getPaymentCollectionRate(@Param("mess_id") Integer mess_id, @Param("month") Integer month, @Param("year") Integer year);
    
    // Find users with highest outstanding balance in a mess
    @Query("SELECT mb FROM MonthlyBill mb WHERE mb.mess.mess_id = :mess_id AND mb.balance > 0 " +
           "ORDER BY mb.balance DESC")
    List<MonthlyBill> findUsersWithHighestOutstandingBalance(@Param("mess_id") Integer mess_id);
    
    // Check if bill exists for user in specific month/year
    @Query("SELECT COUNT(mb) > 0 FROM MonthlyBill mb WHERE mb.user.user_id = :user_id AND " +
           "mb.billing_month = :month AND mb.billing_year = :year")
    Boolean existsByUserAndMonthYear(@Param("user_id") Integer user_id, @Param("month") Integer month, @Param("year") Integer year);
    
    // Get monthly revenue trend for a mess
    @Query("SELECT mb.billing_year, mb.billing_month, SUM(mb.totalAmount) FROM MonthlyBill mb " +
           "WHERE mb.mess.mess_id = :mess_id GROUP BY mb.billing_year, mb.billing_month " +
           "ORDER BY mb.billing_year DESC, mb.billing_month DESC")
    List<Object[]> getMonthlyRevenueTrend(@Param("mess_id") Integer mess_id);
}