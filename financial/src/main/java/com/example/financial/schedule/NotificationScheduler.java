package com.example.financial.schedule;

import com.example.financial.dto.NotificationEvent;
import com.example.financial.entity.Budget;
import com.example.financial.entity.Goal;
import com.example.financial.repository.BudgetRepository;
import com.example.financial.repository.GoalRepository;
import com.example.financial.repository.TransactionRepository;
import com.example.financial.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
    // gửi kafka producer
public class NotificationScheduler {
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final GoalRepository goalRepository;
    private final BudgetRepository budgetRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();


//    @Scheduled(cron = "0 0 8 * * *") // 8h sáng
//    @Scheduled(cron = "*/30 * * * * *")
//    @Scheduled(cron = "0 0/30 * * * *")
//    @Scheduled(cron = "0 * * * * *")  //1 phút
    // lặp qua từng người dùng
    public void processNotifications() throws JsonProcessingException {
        List<String> userIds = userRepository.findDistinctUserIds();
        log.info(userIds.toString());
        for (String userId : userIds) {
            checkTransaction(userId);
            checkExpiringGoals(userId);
            checkAlmostFullBudgets(userId);
            checkExpiringBudgets(userId);
        }
    }
    // gửi kafka
    private void send(String userId,String title,  String message, String type, String link) throws JsonProcessingException {
        NotificationEvent event = new NotificationEvent(userId, title, message, type, link);
        kafkaTemplate.send("notifications", objectMapper.writeValueAsString(event));
    }

    private void checkTransaction(String userId) throws JsonProcessingException {
        if (!transactionRepository.existsByUserUserIdAndTransactionDate(userId, LocalDate.now())) {
            send(userId, "Giao dịch","Bạn chưa thêm giao dịch hôm nay", "reminder", "transaction");
        }
    }

    private void checkExpiringGoals(String userId) throws JsonProcessingException {
        List<Goal> goals = goalRepository.findByUserUserIdAndDeadlineBetween(userId, LocalDate.now(), LocalDate.now().plusDays(3));
        for (Goal g : goals) {
            send(userId, "Mục tiêu","Mục tiêu \"" +g.getGoalName()+ "\" sắp hết hạn", "goal",  "goal/goal-detail/" + g.getId());
        }
    }
//     kiểm tra ngân sách có đủ không
    private void checkAlmostFullBudgets(String userId) throws JsonProcessingException {
        List<Budget> budgets = budgetRepository.findByUserUserId(userId);
        for (Budget b : budgets) {
            BigDecimal spent = transactionRepository.sumAmountByUserIdAndCategoryIdAndTransactionDateBetween(b.getUser().getUserId(),b.getCategory().getId(),b.getStartDate(),b.getEndDate());
            if (spent.compareTo(b.getAmountLimit().multiply(BigDecimal.valueOf(0.9))) >= 0) {
                send(userId, "Ngân sách","Ngân sách \"" +b.getBudgetName() + "\" đã dùng hơn 90%", "budget",  "budget/budget-detail" + b.getId());
            }
        }
    }
// ngân sách sắp hết hạn
    private void checkExpiringBudgets(String userId) throws JsonProcessingException {
        List<Budget> expiring = budgetRepository.findByUserUserIdAndEndDateBetween(userId, LocalDate.now(), LocalDate.now().plusDays(3));
        for (Budget b : expiring) {
            send(userId, "Ngân sách","Ngân sách \""+b.getBudgetName() + "\" sắp hết hạn",  "budget",  "budget/budget-detail" + b.getId());
        }
    }
}
