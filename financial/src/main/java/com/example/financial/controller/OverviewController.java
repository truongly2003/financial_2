package com.example.financial.controller;

import com.example.financial.service.IOverviewService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("api/overview")
public class OverviewController {
    private final IOverviewService overviewService;
    public OverviewController(IOverviewService overviewService, IOverviewService overviewService1) {
        this.overviewService = overviewService1;
    }
    @GetMapping("/total-balance")
    public Map<String, BigDecimal> getFinancialSummary(@RequestParam String userId) {
        return Map.of(
                "totalBalance", overviewService.getTotalBalance(userId),
                "totalIncome", overviewService.getTotalIncome(userId),
                "totalExpense", overviewService.getTotalExpenses(userId)
        );
    }
}
