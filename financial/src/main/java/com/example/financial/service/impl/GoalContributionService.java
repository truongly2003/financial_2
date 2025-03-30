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
        return true;
    }

    @Override
    public boolean updateContribute(Integer contributeId, GoalContributionRequest request) {
        Optional<GoalContribution> optionalGoalContribution = goalContributionRepository.findById(contributeId);
        if (optionalGoalContribution.isPresent()) {
            GoalContribution goalContribution = optionalGoalContribution.get();
            User user = userRepository.findById(request.getUserId()).orElse(null);
            Goal goal = goalRepository.findById(request.getGoalId()).orElse(null);
            goalContribution.setUser(user);
            goalContribution.setGoal(goal);
            goalContribution.setAmount(request.getAmount());
            goalContribution.setContributionDate(request.getContributionDate());
            goalContribution.setDescription(request.getDescription());
            goalContributionRepository.save(goalContribution);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteContribute(Integer contributeId) {
        if (goalContributionRepository.findById(contributeId).isPresent()) {
            goalContributionRepository.deleteById(contributeId);
            return true;
        }
        return false;
    }
}
