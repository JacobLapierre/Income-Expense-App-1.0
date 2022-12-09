package com.api.exptracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.transaction.Transactional;
import javax.persistence.*;
import java.util.List;

@Data
@ToString
@Transactional
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private double income;
    private double savings;
    private double savingGoal;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Expense> expense;
//    @JsonIgnore
//    @OneToMany(mappedBy = "user")
//    private List<Income> income;

}