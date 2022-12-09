package com.api.exptracker.repository;

import com.api.exptracker.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    public List<Income> findByUser_Id(Long id);
}