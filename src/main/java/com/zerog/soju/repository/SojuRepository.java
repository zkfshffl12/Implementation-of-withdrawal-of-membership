package com.zerog.soju.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zerog.soju.entity.sojuentiy;

@Repository
public interface SojuRepository extends JpaRepository<sojuentiy, Long> {
    
    Optional<sojuentiy> findByName(String name);
    
}
