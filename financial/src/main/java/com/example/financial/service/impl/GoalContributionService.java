package com.example.financial.service.impl;

import com.example.financial.dto.request.GoalContributionRequest;
import com.example.financial.dto.response.GoalContributionResponse;
import com.example.financial.entity.Goal;
import com.example.financial.entity.GoalContribution;
import com.example.financial.entity.User;
import com.example.financial.mapper.GoalContributeMapper;
import com.example.financial.repository.GoalContributionRepository;
import com.example.financial.repository.GoalRepository;
import com.example.financial.repository.UserRepository;
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


    @Override
    public List<GoalContributionResponse> getAllGoalByGoalIdAndUserId(Integer goalId, String userId) {
        List<GoalContribution> goalContributions=goalContributionRepository.getGoalContributionsByGoalIdAndUserUserId(goalId, userId);
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
        GoalContribution contribution=goalContributeMapper.toGoalContribution(request);
        contribution.setUser(user);
        contribution.setGoal(goal);
        goalContributionRepository.save(contribution);
        assert goal != null;
        BigDecimal newAmount = goal.getCurrentAmount() == null ? BigDecimal.ZERO : goal.getCurrentAmount();
        goal.setCurrentAmount(newAmount.add(request.getAmount()));
        goalRepository.save(goal);
        return true;
    }

    @Override
    public boolean updateContribute(Integer contributeId, GoalContributionRequest request) {
        Optional<GoalContribution> optionalGoalContribution = goalContributionRepository.findById(contributeId);
        if (optionalGoalContribution.isPresent()) {
            GoalContribution existingContribution = optionalGoalContribution.get();
            Goal goal = existingContribution.getGoal(); // Goal cũ
            BigDecimal oldAmount = existingContribution.getAmount();

            // Cập nhật dữ liệu mới
            User user = userRepository.findById(request.getUserId()).orElse(null);
            Goal newGoal = goalRepository.findById(request.getGoalId()).orElse(null);
            if (user == null || newGoal == null) return false;

            // Nếu goal bị thay đổi -> xử lý chuyển tiền từ goal cũ sang goal mới
            if (!goal.getId().equals(newGoal.getId())) {
                // Trừ khỏi goal cũ
                goal.setCurrentAmount(goal.getCurrentAmount().subtract(oldAmount));
                goalRepository.save(goal);

                // Cộng vào goal mới
                BigDecimal newCurrent = newGoal.getCurrentAmount() == null ? BigDecimal.ZERO : newGoal.getCurrentAmount();
                newGoal.setCurrentAmount(newCurrent.add(request.getAmount()));
                goalRepository.save(newGoal);
            } else {
                // Nếu goal không thay đổi, chỉ cần cập nhật lại số tiền
                goal.setCurrentAmount(goal.getCurrentAmount().subtract(oldAmount).add(request.getAmount()));
                goalRepository.save(goal);
            }

            existingContribution.setUser(user);
            existingContribution.setGoal(newGoal);
            existingContribution.setAmount(request.getAmount());
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
            if (goal.getCurrentAmount() != null) {
                goal.setCurrentAmount(goal.getCurrentAmount().subtract(contribution.getAmount()));
                goalRepository.save(goal);
            }

            goalContributionRepository.deleteById(contributeId);
            return true;
        }
        return false;
    }

}
