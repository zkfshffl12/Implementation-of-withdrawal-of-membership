package com.zerog.soju.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "soju")
@Getter
@NoArgsConstructor
public class sojuentiy {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String brand;

    private double alcohol;

    public sojuentiy(String name, String brand, double alcohol){
        this.name = name;
        this.brand = brand;
        this.alcohol = alcohol;
    }
    
}
