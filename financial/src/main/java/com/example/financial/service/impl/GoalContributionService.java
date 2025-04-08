package com.example.financial.service.impl;

import com.example.financial.dto.request.GoalContributionRequest;
import com.example.financial.dto.response.GoalContributionResponse;
import com.example.financial.entity.Goal;
import com.example.financial.entity.GoalContribution;
import com.example.financial.entity.User;
import com.example.financial.entity.Wallet;
import com.example.financial.mapper.GoalContributeMapper;
import com.example.financial.repository.GoalContributionRepository;
import com.example.financial.repository.GoalRepository;
import com.example.financial.repository.UserRepository;
import com.example.financial.repository.WalletRepository;
import com.example.financial.service.IGoalContributionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalContributionService implements IGoalContributionService {
    final UserRepository userRepository;
    final GoalRepository goalRepository;
    final GoalContributionRepository goalContributionRepository;
    final GoalContributeMapper goalContributeMapper;
    final WalletRepository walletRepository;

    @Override
    public List<GoalContributionResponse> getAllGoalByGoalIdAndUserId(Integer goalId, String userId) {
        List<GoalContribution> goalContributions = goalContributionRepository.getGoalContributionsByGoalIdAndUserUserId(goalId, userId);
        return goalContributions.stream().map(goalContributeMapper::toGoalContributionResponse).toList();
    }

    @Override
    public GoalContributionResponse getGoalContributionById(Integer id) {
        GoalContribution contribution = goalContributionRepository.getGoalContributionById(id);
        return goalContributeMapper.toGoalContributionResponse(contribution);
    }

    @Override
    public boolean addContribute(GoalContributionRequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        Goal goal = goalRepository.findById(request.getGoalId()).orElse(null);
        if (user == null || goal == null) {
            return false;
        }
        Wallet wallet = goal.getWallet();
        if (wallet == null) {
            return false;
        }
        BigDecimal currentBalance = wallet.getBalance() == null ? BigDecimal.ZERO : wallet.getBalance();
        if (currentBalance.compareTo(request.getAmount()) < 0) {
            return false;
        }
        // thêm đóng góp
        GoalContribution contribution = goalContributeMapper.toGoalContribution(request);
        contribution.setUser(user);
        contribution.setGoal(goal);
        goalContributionRepository.save(contribution);
        // truef tền trong ví
        wallet.setBalance(currentBalance.subtract(request.getAmount()));
        walletRepository.save(wallet);
        // lấy số tiền vừa đóng góp + vào mục tiêu hiện tại
        BigDecimal currentGoalAmount = goal.getCurrentAmount() == null ? BigDecimal.ZERO : goal.getCurrentAmount();
        goal.setCurrentAmount(currentGoalAmount.add(request.getAmount()));
        goalRepository.save(goal);
        return true;
    }

    @Override
    public boolean updateContribute(Integer contributeId, GoalContributionRequest request) {
        Optional<GoalContribution> optionalGoalContribution = goalContributionRepository.findById(contributeId);
        if (optionalGoalContribution.isPresent()) {
            GoalContribution existingContribution = optionalGoalContribution.get();
            Goal oldGoal = existingContribution.getGoal();
            Wallet oldWallet = oldGoal.getWallet();
            BigDecimal oldAmount = existingContribution.getAmount();

            User user = userRepository.findById(request.getUserId()).orElse(null);
            Goal newGoal = goalRepository.findById(request.getGoalId()).orElse(null);
            if (user == null || newGoal == null) return false;

            Wallet newWallet = newGoal.getWallet();
            if (oldWallet == null || newWallet == null) return false;

            BigDecimal newAmount = request.getAmount();

            if (oldWallet.getId().equals(newWallet.getId())) {
                //  Cùng ví, tính chênh lệch
                BigDecimal difference = newAmount.subtract(oldAmount);

                if (difference.compareTo(BigDecimal.ZERO) > 0) {
                    // Tăng đóng góp → trừ thêm
                    if (oldWallet.getBalance().compareTo(difference) < 0) return false; // Không đủ tiền
                    oldWallet.setBalance(oldWallet.getBalance().subtract(difference));
                } else {
                    // Giảm đóng góp → hoàn lại tiền
                    oldWallet.setBalance(oldWallet.getBalance().add(difference.abs()));
                }
                walletRepository.save(oldWallet);

                // Cập nhật Goal
                oldGoal.setCurrentAmount(oldGoal.getCurrentAmount().subtract(oldAmount).add(newAmount));
                goalRepository.save(oldGoal);
            }

            // Cập nhật dữ liệu Contribution
            existingContribution.setUser(user);
            existingContribution.setGoal(newGoal);
            existingContribution.setAmount(newAmount);
            existingContribution.setContributionDate(request.getContributionDate());
            existingContribution.setDescription(request.getDescription());
            goalContributionRepository.save(existingContribution);

            return true;
        }
        return false;
    }


    @Override
    public boolean deleteContribute(Integer contributeId) {
        Optional<GoalContribution> optional = goalContributionRepository.findById(contributeId);
        if (optional.isPresent()) {
            GoalContribution contribution = optional.get();
            Goal goal = contribution.getGoal();
            Wallet wallet = goal.getWallet();

            if (wallet == null) return false;

            BigDecimal amount = contribution.getAmount();

            // Cộng lại tiền vào ví
            wallet.setBalance(wallet.getBalance().add(amount));
            walletRepository.save(wallet);

            // Trừ số tiền khỏi mục tiêu
            if (goal.getCurrentAmount() != null) {
                goal.setCurrentAmount(goal.getCurrentAmount().subtract(amount));
                goalRepository.save(goal);
            }

            // Xóa đóng góp
            goalContributionRepository.deleteById(contributeId);
            return true;
        }
        return false;
    }


    @Override
    public boolean hasBalance(Integer goalId, String userId, BigDecimal amount) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Goal> goalOpt = goalRepository.findById(goalId);

        if (userOpt.isEmpty() || goalOpt.isEmpty()) return false;

        Wallet wallet = goalOpt.get().getWallet();
        return wallet != null && wallet.getBalance().compareTo(amount) >= 0;
    }

}
