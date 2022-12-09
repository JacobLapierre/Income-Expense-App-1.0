package com.api.exptracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.transaction.Transactional;
import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Income {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Long amount;
    private String type;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
