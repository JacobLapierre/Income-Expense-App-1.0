package com.api.exptracker.repository;

import com.api.exptracker.model.Expense;
import com.api.exptracker.model.Income;
import com.api.exptracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
}
