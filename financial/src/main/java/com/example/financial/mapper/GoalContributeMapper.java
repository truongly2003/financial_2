package com.example.financial.mapper;

import com.example.financial.dto.request.GoalContributionRequest;
import com.example.financial.dto.response.GoalContributionResponse;
import com.example.financial.entity.Goal;
import com.example.financial.entity.GoalContribution;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GoalContributeMapper {
    @Mapping(source = "goal.id", target = "goalId")
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "description", target = "description")

    GoalContributionResponse toGoalContributionResponse(GoalContribution goalContribution);
    GoalContribution toGoalContribution(GoalContributionRequest request);
}
