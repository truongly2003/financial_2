package com.example.financial.service.impl;

import com.example.financial.dto.request.TransactionRequest;
import com.example.financial.dto.response.TransactionResponse;
import com.example.financial.entity.Category;
import com.example.financial.entity.Transaction;
import com.example.financial.entity.User;
import com.example.financial.entity.Wallet;
import com.example.financial.mapper.TransactionMapper;
import com.example.financial.repository.CategoryRepository;
import com.example.financial.repository.TransactionRepository;
import com.example.financial.repository.UserRepository;
import com.example.financial.repository.WalletRepository;
import com.example.financial.service.ITransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService implements ITransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final CategoryRepository categoryRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    @Override
    public List<TransactionResponse> getAllTransactionByUserIdAndPeriod(String userId, String filterType,Integer walletId) {
        LocalDate startDate;
        LocalDate endDate = LocalDate.now();
        startDate = switch (filterType) {
            case "day" -> endDate;
            case "week" -> endDate.minusDays(endDate.getDayOfWeek().getValue() - 1);
            case "month" -> endDate.withDayOfMonth(1);
            case "year" -> endDate.withDayOfYear(1);
            default -> throw new IllegalArgumentException("Invalid filter type");
        };
        List<Transaction> transactions = transactionRepository.getTransactionsByUserIdAndPeriod(userId, startDate, endDate,walletId);
        return transactions.stream().map(transactionMapper::toTransactionResponse).toList();
    }

    public List<TransactionResponse> getTransactionsByUserIdAndFilterRange(String userId, LocalDate startDate, LocalDate endDate,Integer walletId) {
        List<Transaction> transactions = transactionRepository.getTransactionsByUserIdAndPeriod(userId, startDate, endDate,walletId);
        return transactions.stream().map(transactionMapper::toTransactionResponse).toList();
    }

    @Override
    public List<TransactionResponse> getAllTransactionByUserIdAndBudgetId(String userId, Integer budgetId) {
        List<Transaction> transactions = transactionRepository.getTransactionsByUserIdAndBudgetId(userId, budgetId);
        return transactions.stream().map(transactionMapper::toTransactionResponse).toList();
    }


    @Override
    public TransactionResponse getTransactionById(Integer id) {
        Transaction transaction = transactionRepository.getTransactionById(id);
        return transactionMapper.toTransactionResponse(transaction);
    }
    private void updateWalletBalance(Transaction transaction,BigDecimal amount, boolean isReversal) {
        BigDecimal adjAmount=amount;
        if("expense".equalsIgnoreCase(transaction.getCategory().getCategoryType())){
            adjAmount=adjAmount.negate();
        }
        if(isReversal){
            adjAmount=adjAmount.negate();
        }
        walletRepository.updateBalance(transaction.getWallet().getId(), adjAmount);
    }
    @Override
    public boolean addTransaction(TransactionRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        Wallet wallet = walletRepository.findById(request.getWalletId()).orElse(null);
        User user = userRepository.findById(request.getUserId()).orElse(null);
        if (category == null || wallet == null || user == null) {
            return false;
        }
        Transaction transaction = transactionMapper.toTransaction(request);
        transaction.setCategory(category);
        transaction.setWallet(wallet);
        transaction.setUser(user);
        updateWalletBalance(transaction, transaction.getAmount(), false);
        transactionRepository.save(transaction);
        return true;
    }

    @Override
    public boolean updateTransaction(Integer transactionId, TransactionRequest request) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(transactionId);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            transaction.setAmount(request.getAmount());
            transaction.setDescription(request.getDescription());
            transaction.setCategory(category);
            updateWalletBalance(transaction, transaction.getAmount(), false);
            transactionRepository.save(transaction);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteTransaction(Integer transactionId) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(transactionId);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            updateWalletBalance(transaction, transaction.getAmount(), true);
            transactionRepository.delete(transaction);
        }
        return false;
    }
}
