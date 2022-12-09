package com.api.exptracker.repository;

import com.api.exptracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    public List<Expense> findByUser_Id(Long id);
    public List<Expense> deleteByUser_Id(Long id);
}
