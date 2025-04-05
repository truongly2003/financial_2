package com.example.financial.mapper;
import com.example.financial.dto.request.TransactionRequest;
import com.example.financial.dto.response.TransactionResponse;
import com.example.financial.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface TransactionMapper {
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.categoryName", target = "categoryName")
    @Mapping(source = "category.categoryType", target = "categoryType")
    @Mapping(source = "category.icon", target = "icon")
    @Mapping(source = "wallet.id", target = "walletId")
    TransactionResponse toTransactionResponse(Transaction transaction);

//    @Mapping(target = "category", ignore = true)
//    @Mapping(target = "category")
    Transaction toTransaction(TransactionRequest request);
}
