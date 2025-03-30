package com.example.financial.service;

import java.util.List;
import java.util.Optional;

public interface IBaseService<T,ID> {
    List<T> getALl();
    List<T> getAllById(ID id);
    boolean create(T t);
    boolean update(ID id,T t);
    boolean delete(ID id);
}
