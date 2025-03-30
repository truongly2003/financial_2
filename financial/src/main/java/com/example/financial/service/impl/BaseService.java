package com.example.financial.service.impl;
import com.example.financial.service.IBaseService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collections;
import java.util.List;
public class BaseService <T,ID> implements IBaseService<T,ID> {
    protected final JpaRepository<T,ID> repository;
    public BaseService(JpaRepository<T,ID> repository) {
        this.repository = repository;
    }
    @Override
    public List<T> getALl() {
        return repository.findAll();
    }

    @Override
    public List<T> getAllById(ID id) {
        return repository.findById(id)
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }

    @Override
    public boolean create(T t) {
        return repository.save(t) != null;
    }

    @Override
    public boolean update(ID id, T t) {
        if (repository.existsById(id)) {
            repository.save(t);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(ID id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
